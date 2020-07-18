import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Button,
  ScrollView,
  Modal,
} from 'react-native';
import {AppStyles, Images, Colors} from '../../Themes';
import LinearGradient from 'react-native-linear-gradient';
import {Logo, InputWithIcon, ButtonColored} from '../../Components';
import {totalSize, width, height} from 'react-native-dimension';
import {ButtonGroup, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
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
      user: {},
      showSpinner: false,
      showWarning: false,
      fname: '',
      lname: '',
      selected_screen_index: 0,
      isForgotPasswordModalVisible: false,
      isResetPasswordModalVisible: false,
    };
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
  onDoneForgotPassword = async () => {
    await this.toggleForgotPasswordModal();
    this.toggleResetPasswordModal();
  };

  signIn = async () => {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({
        showSpinner: true,
        showWarning: false,
      });
      await auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
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
          });
          console.log('This is notttt signedd in :: ', e);
        });
    } else {
      this.setState({
        showSpinner: false,
        showWarning: true,
      });
    }
  };

  signUp = async () => {
    if (this.state.email2 !== '' && this.state.password2 !== '') {
      this.setState({
        showSpinner: true,
        showWarning: false,
      });
      await auth()
        .createUserWithEmailAndPassword(this.state.email2, this.state.password2)
        .then(user => {
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
          });
          console.log('This is notttt signedd in :: ', e);
        });
    } else {
      this.setState({
        showSpinner: false,
        showWarning: true,
      });
    }
  };
  render() {
    const {
      selected_screen_index,
      isForgotPasswordModalVisible,
      isResetPasswordModalVisible,
    } = this.state;
    const Screens = ['Login', 'Register'];
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={Images.auth_bg} style={AppStyles.bgContainer}>
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
                // <View style={{position: 'absolute',
                // marginTop: height(10),
                // marginLeft: width(50),}}>
                <ActivityIndicator
                  size="large"
                  color="#00ff00"
                  // style={{
                  //   position: 'absolute',
                  //   marginTop: height(50),
                  //   marginLeft: width(50),
                  // //   marginBottom:0,
                  // //   marginRight:0,
                  // }}
                />
              ) : // </View>

              null}
              {this.state.showWarning ? (
                <View style={{width: width(100), alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>
                    {selected_screen_index === 0
                      ? 'Invalid email/password'
                      : 'Failed to register'}
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
                        {textAlign: 'right', textDecorationLine: 'underline'},
                      ]}>
                      Forgot Password
                    </Text>
                  </View>
                  <ButtonColored
                    text="LOGIN"
                    buttonStyle={{marginVertical: height(5)}}
                    onPress={() => {
                      this.signIn();
                    }}
                  />
                </View>
              ) : (
                <View>
                  <InputWithIcon
                    iconName="account-circle"
                    placeholder="First Name"
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
                  <View
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
                  </View>

                  <ButtonColored
                    onPress={() => {
                      this.signUp();
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
                  containerStyle={{marginVertical: height(2)}}
                />
                <ButtonColored
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
      </ImageBackground>
    );
  }
}

export default Login;
