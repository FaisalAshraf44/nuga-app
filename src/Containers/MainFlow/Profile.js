import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AppStyles, Images, Colors, FontFamily} from '../../Themes';
import {UserImage, InputWithIcon, ButtonColored} from '../../Components';
import {Icon, ButtonGroup} from 'react-native-elements';
import {totalSize, height, width} from 'react-native-dimension';
import {RootConsumer} from '../../Backend/Context';

import {
  getData,
  saveDataWithDocId,
  updateField,
  uploadImage_returnURL,
} from '../../Backend/utility';
import {color} from 'react-native-reanimated';
import {_retrieveData, _storeData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-simple-toast';
import {image_picker} from '../../Backend/imageHandler';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const FireBaseStorage = storage();
let globalContext = null;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttonLoading: false,
      user: {
        fname: '',
        lname: '',
        name: '',
        email: '',
        phone: '',
        profileImage: '',
        handicap: '',
        isActive: '',
        membership: '',
        gender: 1,
      },
      selectedGenderIndex: 1,
      imageB64String: '',
      imageName: '',
      imageUrl: '',
      imageType: '',
      imageSource: '',
    };
  }
  updateGenderIndex = selectedGenderIndex => {
    this.state.user.gender = selectedGenderIndex;
    this.setState({selectedGenderIndex});
  };

  async componentDidMount() {
    this.setState({loading: true});
    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);

    await firebase
      .firestore()
      .collection('Users')
      .doc(this.userData.uuid)
      .onSnapshot(async doc => {
        if (doc.data()) {
          this.setState({user: doc.data(), loading: false});
          globalContext && globalContext.setUserData(doc.data());

          await _storeData('userData', JSON.stringify(doc.data()));
        }
      });
  }

  onAddImage = imageData => {
    this.setState({
      imageB64String: imageData.data,
      imageName: imageData.fileName,
      imageUrl: Platform.OS === 'ios' ? imageData.uri : imageData.path,
      imageType: imageData.type,
      imageSource: imageData.uri,
    });
  };

  updateProfile = async () => {
    const {user} = this.state;
    this.setState({buttonLoading: true});
    user.name = user.fname.trim() + ' ' + user.lname.trim();

    const updated = await saveDataWithDocId(
      'Users',
      this.userData.uuid,
      this.state.user,
    );

    if (updated && this.state.imageSource) {
      const reference = FireBaseStorage.ref(`Users/${this.state.imageName}`);

      const pathToFile = this.state.imageUrl;

      const task = await reference.putFile(pathToFile);

      if (task.state == 'success') {
        const url = await storage()
          .ref(`Users/${this.state.imageName}`)
          .getDownloadURL();
        this.state.user.profileImage = url;
        const updated = await saveDataWithDocId(
          'Users',
          this.userData.uuid,
          this.state.user,
        );
        if (updated) {
          Toast.show('Profile updated succesfully');
          this.setState({buttonLoading: false, imageSource: ''});
        } else {
          this.setState({buttonLoading: false});
        }
      }
    } else {
      Toast.show('Profile updated succesfully');
      this.setState({buttonLoading: false});
    }
  };

  storeImage = async downloadURL => {
    const uid = await AsyncStorage.getItem('uid');
    const response = updateField('Users', this.userData.uuid, {
      profileImage: downloadURL,
    });
    if (response) {
      this.setState({buttonLoading: false, imageSource: ''});
      Toast.show('Profile updated succesfully');
    } else {
      this.setState({buttonLoading: false});
    }
  };

  render() {
    const Genders = ['Female', 'Male'];
    const {user, loading, buttonLoading, imageSource} = this.state;
    return (
      <RootConsumer>
        {context => {
          globalContext = context;
          const user = context.userData;
          return (
            <View style={AppStyles.mainContainer}>
              {this.state.loading ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              ) : (
                <ScrollView>
                  <View
                    style={[AppStyles.compContainer, {alignItems: 'center'}]}>
                    <View>
                      {imageSource || user.profileImage ? (
                        <UserImage
                          source={{
                            uri: imageSource
                              ? imageSource
                              : user.profileImage
                              ? user.profileImage
                              : 'https://lh3.googleusercontent.com/proxy/3cUh1csEsvh_CReTfD4rW8bBklAwVdBzLkw_r_sqG9sFUAyd2NcKrydmiRc3bp59YQZcDXcwIACEordDp78i_o1iogBLDV6-OirJFBiUEgyct3RkomwFc2YM9l7-7z3e4cJAvNoplYMstw',
                          }}
                          size={totalSize(15)}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => image_picker(this.onAddImage)}
                          activeOpacity={1}
                          style={{
                            alignSelf: 'center',
                            width: totalSize(15),
                            height: totalSize(15),
                            borderWidth: 1,
                            borderRadius: totalSize(15),
                            borderColor: Colors.appColor1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <UserImage
                          source={{
                            uri: user.profileImage
                              ? user.profileImage
                              : 'https://lh3.googleusercontent.com/proxy/3cUh1csEsvh_CReTfD4rW8bBklAwVdBzLkw_r_sqG9sFUAyd2NcKrydmiRc3bp59YQZcDXcwIACEordDp78i_o1iogBLDV6-OirJFBiUEgyct3RkomwFc2YM9l7-7z3e4cJAvNoplYMstw',
                          }}
                        /> */}
                          <Text
                            style={{
                              textAlign: 'center',
                              color: Colors.appTextColor5,
                            }}>
                            Select image to upload
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{position: 'absolute', top: -2.5, right: -2.5}}
                        onPress={() => image_picker(this.onAddImage)}>
                        <View
                          style={[
                            {
                              height: totalSize(4),
                              width: totalSize(4),
                              borderRadius: 100,
                              backgroundColor: Colors.appBgColor1,
                              borderWidth: 0.5,
                              borderColor: Colors.appColor1,
                            },
                            AppStyles.center,
                          ]}>
                          <Icon
                            name="edit-2"
                            type="feather"
                            size={totalSize(2)}
                            color={Colors.appColor1}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[
                        AppStyles.h5,
                        AppStyles.textGreen,
                        {marginTop: height(2)},
                      ]}>
                      {user.name}
                    </Text>
                    <View
                      style={[
                        {
                          backgroundColor: Colors.appColor1,
                          borderRadius: 100,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          marginTop: height(1),
                        },
                      ]}>
                      <Text
                        style={[AppStyles.textMedium, AppStyles.textWhite, {}]}>
                        Membership Fee:{' '}
                        <Text
                          style={[
                            AppStyles.textWhite,
                            {fontFamily: FontFamily.appTextBold},
                          ]}>
                          {user.membership}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <InputWithIcon
                    title="First Name"
                    //   value="John"
                    value={user.fname}
                    onChangeText={text => {
                      let user = this.state.user;
                      user.fname = text;
                      this.setState({user});
                    }}
                    iconName="account"
                    placeholder="First Name"
                    rightIconName="edit-2"
                    rightIconType="feather"
                  />
                  <InputWithIcon
                    title="Last Name"
                    //   value="Doe"
                    value={user.lname}
                    onChangeText={text => {
                      let user = this.state.user;
                      user.lname = text;
                      this.setState({user});
                    }}
                    iconName="account-outline"
                    placeholder="Last Name"
                    rightIconName="edit-2"
                    rightIconType="feather"
                    containerStyle={styles.inputContainerStyle}
                  />
                  <InputWithIcon
                    title="Email"
                    //   value="john9988@gmail.com"
                    editable={false}
                    // value={user.email}
                    onChangeText={text => {
                      let user = this.state.user;
                      user.email = text;
                      this.setState({user});
                    }}
                    iconName="email"
                    placeholder={user.email}
                    rightIconName="edit-2"
                    rightIconType="feather"
                    containerStyle={styles.inputContainerStyle}
                  />
                  <InputWithIcon
                    title="Telephone"
                    //   value="+448182181821"
                    value={user.phone}
                    onChangeText={text => {
                      let user = this.state.user;
                      user.phone = text;
                      this.setState({user});
                    }}
                    iconName="phone"
                    placeholder="Telephone"
                    rightIconName="edit-2"
                    rightIconType="feather"
                    containerStyle={styles.inputContainerStyle}
                  />
                  <InputWithIcon
                    title="Gender"
                    //value='Male'
                    editable={false}
                    iconName="human-male-female"
                    //placeholder="Gender"
                    // rightIconName="edit-2"
                    // rightIconType="feather"
                    inputRight={
                      <ButtonGroup
                        buttons={Genders}
                        containerStyle={{
                          width: width(40),
                          height: height(6),
                          marginRight: 5,
                          borderRadius: 10,
                          borderWidth: 0,
                          backgroundColor: Colors.appBgColor2,
                        }}
                        selectedButtonStyle={{
                          backgroundColor: Colors.appColor1,
                          borderRadius: 10,
                        }}
                        selectedIndex={user.gender}
                        onPress={this.updateGenderIndex}
                        textStyle={[
                          AppStyles.textRegular,
                          {color: Colors.appColor1},
                        ]}
                        innerBorderStyle={{width: 0}}
                      />
                    }
                    containerStyle={styles.inputContainerStyle}
                  />
                  <InputWithIcon
                    title="Handicap"
                    //   value="14"
                    value={user.handicap}
                    onChangeText={text => {
                      let user = this.state.user;
                      user.handicap = text;
                      this.setState({user});
                    }}
                    iconName="golf"
                    placeholder="Handicap"
                    rightIconName="edit-2"
                    rightIconType="feather"
                    containerStyle={styles.inputContainerStyle}
                  />
                  {/* <InputWithIcon
              //title="New Password"
              //value='14'
              iconName="lock"
              secureTextEntry={true}
              placeholder="New Password"
              //rightIconName="edit-2"
              //rightIconType="feather"
              containerStyle={styles.inputContainerStyle}
            />
            <InputWithIcon
              //title="New Password"
              //value='14'
              iconName="lock"
              secureTextEntry={true}
              placeholder="Confirm Password"
              //rightIconName="edit-2"
              //rightIconType="feather"
              containerStyle={styles.inputContainerStyle}
            /> */}
                  <ButtonColored
                    loading={buttonLoading}
                    onPress={this.updateProfile}
                    text="Update Profile"
                    buttonStyle={{marginVertical: height(5)}}
                  />
                </ScrollView>
              )}
            </View>
          );
        }}
      </RootConsumer>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: height(3),
  },
});
