import React, { Component } from 'react';
import { View, Text, ImageBackground, Button, ScrollView, Modal } from 'react-native';
import { AppStyles, Images, Colors } from '../../Themes';
import LinearGradient from 'react-native-linear-gradient';
import { Logo, InputWithIcon, ButtonColored } from '../../Components';
import { totalSize, width, height } from 'react-native-dimension';
import { ButtonGroup, Icon } from 'react-native-elements'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_screen_index: 0,
            isForgotPasswordModalVisible: false,
            isResetPasswordModalVisible: false

        };
    }
    updateScreenIndex = (selected_screen_index) => {
        this.setState({ selected_screen_index })
    }
    toggleForgotPasswordModal = () => this.setState({ isForgotPasswordModalVisible: !this.state.isForgotPasswordModalVisible })
    toggleResetPasswordModal = () => this.setState({ isResetPasswordModalVisible: !this.state.isResetPasswordModalVisible })
    onDoneForgotPassword = async () => {
        await this.toggleForgotPasswordModal()
        this.toggleResetPasswordModal()
    }
    render() {
        const { selected_screen_index, isForgotPasswordModalVisible, isResetPasswordModalVisible } = this.state
        const Screens = ['Login', 'Register']
        const { navigate } = this.props.navigation
        return (
            <ImageBackground source={Images.auth_bg} style={AppStyles.bgContainer}>
                <LinearGradient
                    colors={Colors.appGradiantColors1}
                    locations={[0.25, 1]}
                    style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={[AppStyles.compContainer, AppStyles.center]}>
                                <Logo size={totalSize(15)} />
                            </View>
                            <ButtonGroup
                                selectedIndex={selected_screen_index}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginRight: width(30), marginLeft: width(5), marginVertical: height(2.5) }}
                                buttons={Screens}
                                selectedButtonStyle={{ backgroundColor: 'transparent', borderBottomWidth: 2.5, borderBottomColor: Colors.appColor1 }}
                                innerBorderStyle={{ width: 0 }}
                                selectedTextStyle={[{ color: Colors.appColor1 }]}
                                textStyle={[AppStyles.h6, AppStyles.textLightGray]}
                                onPress={this.updateScreenIndex}
                            />
                            {
                                selected_screen_index === 0 ?
                                    <View>
                                        <InputWithIcon
                                            iconName="email"
                                            placeholder="Email"
                                        />
                                        <InputWithIcon
                                            iconName="lock"
                                            placeholder="Password"
                                            containerStyle={{ marginTop: height(2.5) }}
                                        />
                                        <View style={[AppStyles.compContainer, { marginVertical: height(1) }]}>
                                            <Text onPress={this.toggleForgotPasswordModal} style={[AppStyles.textRegular, AppStyles.textGreen, { textAlign: 'right', textDecorationLine: 'underline' }]}>Forgot Password</Text>
                                        </View>
                                        <ButtonColored
                                            text="LOGIN"
                                            buttonStyle={{ marginVertical: height(5) }}
                                            onPress={() => navigate('App')}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <InputWithIcon
                                            iconName="account-circle"
                                            placeholder="First Name"
                                        />
                                        <InputWithIcon
                                            iconName="account-circle-outline"
                                            placeholder="Last Name"
                                            containerStyle={{ marginTop: height(2) }}
                                        />
                                        <InputWithIcon
                                            iconName="email"
                                            placeholder="Email"
                                            containerStyle={{ marginTop: height(2) }}
                                        />
                                        <InputWithIcon
                                            iconName="lock"
                                            placeholder="Password"
                                            containerStyle={{ marginTop: height(2) }}
                                        />
                                        <View style={[AppStyles.compContainer, { marginVertical: height(1.5) }]}>
                                            <Text style={[AppStyles.textRegular, AppStyles.textGreen, AppStyles.textCenter, {}]}>By creating an account you agree to our Terms and Conditions</Text>
                                        </View>
                                        <ButtonColored
                                            text="CREATE ACCOUNT"
                                            buttonStyle={{ marginVertical: height(2.5) }}
                                        />
                                    </View>
                            }
                        </View>
                    </ScrollView>
                </LinearGradient>
                <Modal
                    visible={isForgotPasswordModalVisible}
                    transparent
                    animationType="slide"
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 2 }}></View>
                        <View style={[{ flex: 8, backgroundColor: Colors.appBgColor1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }, AppStyles.shadow]}>
                            <ScrollView>
                                <View style={AppStyles.compContainer}>
                                    <Text style={[AppStyles.h4, AppStyles.textCenter, AppStyles.textGreen]}>Forgot Password</Text>
                                    <Text style={[AppStyles.textRegular, AppStyles.textCenter, AppStyles.textLightGray, { marginTop: height(2.5) }]}>Enter email to reset your passcode</Text>
                                </View>
                                <InputWithIcon
                                    iconName="email"
                                    placeholder="Email"
                                    containerStyle={{ marginVertical: height(2) }}
                                />
                                <ButtonColored
                                    text="DONE"
                                    buttonStyle={{ marginVertical: height(2.5) }}
                                    onPress={() => this.onDoneForgotPassword()}
                                />
                                <View style={{ position: 'absolute', top: totalSize(2), right: totalSize(2) }}>
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
                    animationType="slide"
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 2 }}></View>
                        <View style={[{ flex: 8, backgroundColor: Colors.appBgColor1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }, AppStyles.shadow]}>
                            <ScrollView>
                                <View style={AppStyles.compContainer}>
                                    <Text style={[AppStyles.h4, AppStyles.textCenter, AppStyles.textGreen]}>Reset Your Passcode</Text>
                                    <Text style={[AppStyles.textRegular, AppStyles.textCenter, AppStyles.textLightGray, { marginTop: height(2.5) }]}>Please check your email and enter the reset code</Text>
                                </View>
                                <InputWithIcon
                                    iconName="lock"
                                    placeholder="Reset Code"
                                    containerStyle={{ marginVertical: height(2) }}
                                />
                                <InputWithIcon
                                    iconName="lock"
                                    placeholder="New Password"
                                    containerStyle={{ marginVertical: height(2) }}
                                />
                                <InputWithIcon
                                    iconName="lock"
                                    placeholder="Confirm Password"
                                    containerStyle={{ marginVertical: height(2) }}
                                />
                                <ButtonColored
                                    text="Change Password"
                                    buttonStyle={{ marginVertical: height(2.5) }}
                                />
                                <View style={{ position: 'absolute', top: totalSize(2), right: totalSize(2) }}>
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
