import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {AppStyles, Images, Colors, FontFamily} from '../../Themes';
import {UserImage, InputWithIcon, ButtonColored} from '../../Components';
import {Icon, ButtonGroup} from 'react-native-elements';
import {totalSize, height, width} from 'react-native-dimension';
import {getData, saveDataWithDocId} from '../../Backend/utility';
import {color} from 'react-native-reanimated';
import {_retrieveData, _storeData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
        gender: '',
      },
      selectedGenderIndex: 1,
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
        }
      });
  }

  updateProfile = async () => {
    const updated = await saveDataWithDocId(
      'Users',
      this.userData.uuid,
      this.state.user,
    );
    if (updated) {
      alert('updated');
    }
  };

  render() {
    const Genders = ['Female', 'Male'];
    const {user, loading} = this.state;
    return (
      <View style={AppStyles.mainContainer}>
        {this.state.loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <ScrollView>
            <View style={[AppStyles.compContainer, {alignItems: 'center'}]}>
              <View>
                <UserImage
                  source={{uri: user.profileImage}}
                  size={totalSize(15)}
                />
                <View style={{position: 'absolute', top: -2.5, right: -2.5}}>
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
                </View>
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
                <Text style={[AppStyles.textMedium, AppStyles.textWhite, {}]}>
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
                  selectedIndex={this.state.selectedGenderIndex}
                  onPress={this.updateGenderIndex}
                  textStyle={[AppStyles.textRegular, {color: Colors.appColor1}]}
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
              onPress={this.updateProfile}
              text="Update Profile"
              buttonStyle={{marginVertical: height(5)}}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: height(3),
  },
});
