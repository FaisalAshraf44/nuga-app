import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Button,
  ScrollView,
  Modal,
  Alert,
  BackHandler,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AppStyles, Images, Colors} from '../../Themes';
import LinearGradient from 'react-native-linear-gradient';
import {Logo, InputWithIcon, ButtonColored} from '../../Components';
import {totalSize, width, height} from 'react-native-dimension';
import {ButtonGroup, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {_storeData, _retrieveData} from '../../Backend/AsyncFuncs';
import {saveData, getData} from '../../Backend/utility';
import {RootConsumer} from '../../Backend/Context';
import Toast from 'react-native-simple-toast';
import HTML from 'react-native-render-html';

let globalContext = null;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      email2: '',
      password2: '',
      checked: true,
      // pan: new Animated.ValueXY({x: 0, y: hp(95)}),
      forgotPassword: false,
      initializing: true,
      forgotPasswordEmail: '',
      user: {},
      loading: false,
      loadingTerms: false,
      terms: '',
      showSpinner: false,
      showWarning: false,
      ErrorMessege: '',
      fname: '',
      lname: '',
      selected_screen_index: 0,
      isForgotPasswordModalVisible: false,
      isResetPasswordModalVisible: false,
      isTermsModal: false,
      text: '',
    };
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  async componentDidMount() {
    this.setState({loadingTerms: true});
    const terms = await getData('Terms', '1');

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    this.setState({terms, loadingTerms: false});
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  updateScreenIndex = selected_screen_index => {
    this.setState({selected_screen_index});
  };
  toggleForgotPasswordModal = () =>
    this.setState({
      isForgotPasswordModalVisible: !this.state.isForgotPasswordModalVisible,
    });
  toggleResetPasswordModal = () =>
    this.setState({
      isResetPasswordModalVisible: !this.state.isResetPasswordModalVisible,
    });

  toggleTermsModal = () =>
    this.setState({
      isTermsModal: !this.state.isTermsModal,
    });

  onDoneForgotPassword = async () => {
    this.setState({loading: true});
    await auth()
      .sendPasswordResetEmail(this.state.forgotPasswordEmail)
      .then(async a => {
        Toast.show('Password reset email sent');
        this.setState({loading: false});

        this.toggleForgotPasswordModal();
      })
      .catch(e => {
        this.setState({loading: false});

        console.log('This is error of email :: ', e);
      });

    // this.toggleResetPasswordModal();
  };

  async checkSignupValidation() {
    if (this.state.fname === '' || this.state.lname === '') {
      this.setState({
        ErrorMessege: 'The first name and last name cannot be empty',
        showWarning: true,
      });
      return 1;
    }
    //EmailCheck
    let regex1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex1.test(this.state.email2) === false) {
      // console.log("Email is Not Correct");
      this.state.email2 !== undefined && this.state.email2 !== ''
        ? this.setState({
            ErrorMessege: 'The email is badly formatted',
            showWarning: true,
          })
        : this.setState({
            ErrorMessege: 'The email cannot be empty',
            showWarning: true,
          });
      return 1;
    }

    let reg1 = /^[\w\d@$!%*#?&]{6,30}$/;
    if (reg1.test(this.state.password2) === false) {
      // console.log("UserName is Not Correct");
      this.state.password2 === ''
        ? this.setState({
            ErrorMessege: 'The password cannot be empty',
            showWarning: true,
          })
        : this.state.password2.length > 5
        ? this.setState({
            ErrorMessege: 'The password is badly formatted',
            showWarning: true,
          })
        : this.setState({
            ErrorMessege: 'The password should be atleast 6 characters long',
            showWarning: true,
          });
      // this.setState({ email: text })
      return 1;
    }

    return 0;
  }

  async signupValidationHelper() {
    // alert('hello');
    this.setState({showSpinner: true});
    let TempCheck = await this.checkSignupValidation();

    switch (TempCheck) {
      case 0:
        this.signUp();
        break;
      case 1:
        this.setState({showSpinner: false});
        // Toast.show(this.state.ErrorMessege);
        break;
      default:
        break;
    }
  }

  async checkValidation() {
    //EmailCheck
    let regex1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex1.test(this.state.email) === false) {
      // console.log("Email is Not Correct");
      this.state.email !== undefined && this.state.email !== ''
        ? this.setState({
            ErrorMessege: 'The email is badly formatted',
            showWarning: true,
          })
        : this.setState({
            ErrorMessege: 'The email cannot be empty',
            showWarning: true,
          });
      return 1;
    }
    let reg1 = /^[\w\d@$!%*#?&]{6,30}$/;
    if (reg1.test(this.state.password) === false) {
      // console.log("UserName is Not Correct");
      this.state.password === ''
        ? this.setState({
            ErrorMessege: 'The password cannot be empty',
            showWarning: true,
          })
        : this.state.password.length > 5
        ? this.setState({
            ErrorMessege: 'The password is badly formatted',
            showWarning: true,
          })
        : this.setState({
            ErrorMessege: 'The password should be atleast 6 characters long',
            showWarning: true,
          });
      // this.setState({ email: text })
      return 1;
    }
    return 0;
  }

  async validationHelper() {
    this.setState({showSpinner: true});
    let TempCheck = await this.checkValidation();

    switch (TempCheck) {
      case 0:
        this.signIn();
        break;
      case 1:
        this.setState({showSpinner: false});
        // Toast.show(this.state.ErrorMessege);
        break;
      default:
        break;
    }
  }

  signIn = async () => {
    this.setState({
      showSpinner: true,
      showWarning: false,
    });
    await auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async user => {
        await _storeData('Token', user.user.uid);
        const userData = await getData('Users', user.user.uid);
        globalContext.setUserData(userData);
        await _storeData('userData', JSON.stringify(userData));
        if (user) {
          this.setState({
            showSpinner: false,
          });
          this.setState({
            email: '',
            password: '',
            email2: '',
            password2: '',
            fname: '',
            lname: '',
          });
          this.props.navigation.navigate('App');
          console.log('This is signedd in :: ', user);
        }
      })
      .catch(e => {
        this.setState({
          showSpinner: false,
          showWarning: true,
          ErrorMessege: 'Invalid email/password',
        });
        console.log('This is notttt signedd in :: ', e);
      });
  };

  signUp = async () => {
    this.setState({
      showSpinner: true,
      showWarning: false,
    });
    await auth()
      .createUserWithEmailAndPassword(this.state.email2, this.state.password2)
      .then(async user => {
        await _storeData('Token', user.user.uid);
        const fcmToken = await _retrieveData('fcmToken');
        console.log('fcm == :', fcmToken);

        await saveData('Users', user.user.uid, {
          uuid: user.user.uid,
          fname: this.state.fname,
          lname: this.state.lname,
          name: this.state.fname.trim() + ' ' + this.state.lname,
          handicap: '0',
          isActive: true,
          phone: '',
          email: this.state.email2,
          gender: 1,
          membership: 'Unknown',
          profileImage: '',
          timestampRegister: new Date(),
          fcmToken,
        });
        const userData = await getData('Users', user.user.uid);
        globalContext.setUserData(userData);
        await _storeData('userData', JSON.stringify(userData));
        if (user) {
          this.setState({
            showSpinner: false,
          });
          this.setState({
            email: '',
            password: '',
            email2: '',
            password2: '',
            fname: '',
            lname: '',
          });
          Toast.show('Account created succesfully');
          this.props.navigation.navigate('App');
          console.log('This is signedd in :: ', user);
        }
      })
      .catch(e => {
        this.setState({
          showSpinner: false,
          showWarning: true,
          ErrorMessege: e.code,
        });
        console.log('This is notttt signedd in :: ', e);
      });
  };
  render() {
    const {
      selected_screen_index,
      isForgotPasswordModalVisible,
      isResetPasswordModalVisible,
      isTermsModal,
      loadingTerms,
      terms,
    } = this.state;
    const Screens = ['Login', 'Register'];
    const {navigate} = this.props.navigation;
    return (
      <RootConsumer>
        {context => {
          globalContext = context;
          // const userDat = context.userProfile;
          return (
            <ImageBackground
              source={Images.auth_bg}
              style={AppStyles.bgContainer}>
              <LinearGradient
                colors={Colors.appGradiantColors1}
                locations={[0.25, 1]}
                style={{flex: 1}}>
                <ScrollView>
                  <View style={{flex: 1}}>
                    <View style={[AppStyles.compContainer, AppStyles.center]}>
                      <Logo size={totalSize(15)} />
                    </View>
                    {this.state.showSpinner ? (
                      <ActivityIndicator size="large" color="#00ff00" />
                    ) : null}
                    {this.state.showWarning ? (
                      <View style={{width: width(100), alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>
                          {selected_screen_index === 0
                            ? this.state.ErrorMessege
                            : this.state.ErrorMessege}
                        </Text>
                      </View>
                    ) : null}
                    <ButtonGroup
                      selectedIndex={selected_screen_index}
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        marginRight: width(30),
                        marginLeft: width(5),
                        marginVertical: height(2.5),
                      }}
                      buttons={Screens}
                      selectedButtonStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 2.5,
                        borderBottomColor: Colors.appColor1,
                      }}
                      innerBorderStyle={{width: 0}}
                      selectedTextStyle={[{color: Colors.appColor1}]}
                      textStyle={[AppStyles.h6, AppStyles.textLightGray]}
                      onPress={this.updateScreenIndex}
                    />
                    {selected_screen_index === 0 ? (
                      <View>
                        <InputWithIcon
                          keyboardType="email-address"
                          value={this.state.email}
                          onChangeText={e => {
                            console.log(e);
                            this.setState({
                              email: e,
                              showWarning: false,
                            });
                          }}
                          iconName="email"
                          placeholder="Email"
                        />
                        <InputWithIcon
                          iconName="lock"
                          placeholder="Password"
                          secureTextEntry={true}
                          value={this.state.password}
                          onChangeText={e => {
                            this.setState({
                              password: e,
                              showWarning: false,
                            });
                          }}
                          containerStyle={{marginTop: height(2.5)}}
                        />
                        <View
                          style={[
                            AppStyles.compContainer,
                            {marginVertical: height(1)},
                          ]}>
                          <Text
                            onPress={this.toggleForgotPasswordModal}
                            style={[
                              AppStyles.textRegular,
                              AppStyles.textGreen,
                              {
                                textAlign: 'right',
                                textDecorationLine: 'underline',
                              },
                            ]}>
                            Forgot Password
                          </Text>
                        </View>
                        <ButtonColored
                          text="LOGIN"
                          buttonStyle={{marginVertical: height(5)}}
                          onPress={() => {
                            this.validationHelper();
                          }}
                        />
                      </View>
                    ) : (
                      <View>
                        {true == false ? (
                          <InputWithIcon
                            iconName="account-circle"
                            keyboardType="default"
                          />
                        ) : null}
                        <InputWithIcon
                          iconName="account-circle"
                          placeholder="First Name"
                          keyboardType="default"
                          value={this.state.fname}
                          onChangeText={e => {
                            this.setState({
                              fname: e,
                              showWarning: false,
                            });
                          }}
                        />
                        <InputWithIcon
                          iconName="account-circle-outline"
                          placeholder="Last Name"
                          value={this.state.lname}
                          onChangeText={e => {
                            this.setState({
                              lname: e,
                              showWarning: false,
                            });
                          }}
                          containerStyle={{marginTop: height(2)}}
                        />
                        <InputWithIcon
                          iconName="email"
                          placeholder="Email"
                          keyboardType="email-address"
                          value={this.state.email2}
                          onChangeText={e => {
                            this.setState({
                              email2: e,
                              showWarning: false,
                            });
                          }}
                          containerStyle={{marginTop: height(2)}}
                        />
                        <InputWithIcon
                          iconName="lock"
                          placeholder="Password"
                          value={this.state.password2}
                          onChangeText={e => {
                            this.setState({
                              password2: e,
                              showWarning: false,
                            });
                          }}
                          containerStyle={{marginTop: height(2)}}
                        />
                        <TouchableOpacity
                          onPress={this.toggleTermsModal}
                          activeOpacity={0.5}
                          style={[
                            AppStyles.compContainer,
                            {marginVertical: height(1.5)},
                          ]}>
                          <Text
                            style={[
                              AppStyles.textRegular,
                              AppStyles.textWhite,
                              AppStyles.textCenter,
                              {},
                            ]}>
                            By creating an account, you agree to our Terms and
                            Conditions
                          </Text>
                        </TouchableOpacity>

                        <ButtonColored
                          onPress={() => {
                            this.signupValidationHelper();
                          }}
                          text="CREATE ACCOUNT"
                          buttonStyle={{marginVertical: height(2.5)}}
                        />
                      </View>
                    )}
                  </View>
                </ScrollView>
              </LinearGradient>
              <Modal
                visible={isForgotPasswordModalVisible}
                transparent
                animationType="slide">
                <View style={{flex: 1}}>
                  <View style={{flex: 2}} />
                  <View
                    style={[
                      {
                        flex: 8,
                        backgroundColor: Colors.appBgColor1,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                      },
                      AppStyles.shadow,
                    ]}>
                    <ScrollView>
                      <View style={AppStyles.compContainer}>
                        <Text
                          style={[
                            AppStyles.h4,
                            AppStyles.textCenter,
                            AppStyles.textGreen,
                          ]}>
                          Forgot Password
                        </Text>
                        <Text
                          style={[
                            AppStyles.textRegular,
                            AppStyles.textCenter,
                            AppStyles.textLightGray,
                            {marginTop: height(2.5)},
                          ]}>
                          Enter email to reset your passcode
                        </Text>
                      </View>
                      <InputWithIcon
                        iconName="email"
                        placeholder="Email"
                        value={this.state.forgotPasswordEmail}
                        onChangeText={text =>
                          this.setState({forgotPasswordEmail: text})
                        }
                        containerStyle={{marginVertical: height(2)}}
                      />
                      <ButtonColored
                        loading={this.state.loading}
                        text="DONE"
                        buttonStyle={{marginVertical: height(2.5)}}
                        onPress={() => this.onDoneForgotPassword()}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: totalSize(2),
                          right: totalSize(2),
                        }}>
                        <Icon
                          name="close"
                          //reverse
                          size={totalSize(3)}
                          color={Colors.appColor1}
                          onPress={this.toggleForgotPasswordModal}
                        />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={isResetPasswordModalVisible}
                transparent
                animationType="slide">
                <View style={{flex: 1}}>
                  <View style={{flex: 2}} />
                  <View
                    style={[
                      {
                        flex: 8,
                        backgroundColor: Colors.appBgColor1,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                      },
                      AppStyles.shadow,
                    ]}>
                    <ScrollView>
                      <View style={AppStyles.compContainer}>
                        <Text
                          style={[
                            AppStyles.h4,
                            AppStyles.textCenter,
                            AppStyles.textGreen,
                          ]}>
                          Reset Your Passcode
                        </Text>
                        <Text
                          style={[
                            AppStyles.textRegular,
                            AppStyles.textCenter,
                            AppStyles.textLightGray,
                            {marginTop: height(2.5)},
                          ]}>
                          Please check your email and enter the reset code
                        </Text>
                      </View>
                      <InputWithIcon
                        iconName="lock"
                        placeholder="Reset Code"
                        containerStyle={{marginVertical: height(2)}}
                      />
                      <InputWithIcon
                        iconName="lock"
                        placeholder="New Password"
                        containerStyle={{marginVertical: height(2)}}
                      />
                      <InputWithIcon
                        iconName="lock"
                        placeholder="Confirm Password"
                        containerStyle={{marginVertical: height(2)}}
                      />
                      <ButtonColored
                        text="Change Password"
                        buttonStyle={{marginVertical: height(2.5)}}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: totalSize(2),
                          right: totalSize(2),
                        }}>
                        <Icon
                          name="close"
                          //reverse
                          size={totalSize(3)}
                          color={Colors.appColor1}
                          onPress={this.toggleResetPasswordModal}
                        />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
              <Modal visible={isTermsModal} transparent animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}>
                  <View
                    style={[
                      {
                        flex: 8,
                        backgroundColor: Colors.appBgColor1,
                        borderRadius: 25,
                        marginVertical: 24,
                        marginHorizontal: 16,
                        paddingVertical: 16,
                        paddingHorizontal: 8,
                      },
                      AppStyles.shadow,
                    ]}>
                    <TouchableOpacity onPress={this.toggleTermsModal}>
                      <Icon
                        name="close"
                        type="material-community"
                        style={{alignSelf: 'flex-end', marginRight: 8}}
                      />
                    </TouchableOpacity>
                    {loadingTerms ? (
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                      </View>
                    ) : (
                      <ScrollView>
                        <HTML
                          html={terms.termsOfService}
                          imagesMaxWidth={Dimensions.get('window').width}
                        />
                      </ScrollView>
                    )}
                  </View>
                </View>
              </Modal>
            </ImageBackground>
          );
        }}
      </RootConsumer>
    );
  }
}

export default Login;
