import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppStyles, Images, Colors } from '../../Themes';
import { UserImage, InputWithIcon, ButtonColored } from '../../Components';
import { Icon, ButtonGroup } from 'react-native-elements';
import { totalSize, height, width } from 'react-native-dimension';
import { color } from 'react-native-reanimated';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenderIndex: 1,
        };
    }
    updateGenderIndex = (selectedGenderIndex) => {
        this.setState({ selectedGenderIndex })
    }
    render() {
        const Genders = ['Female', 'Male']
        return (
            <View style={AppStyles.mainContainer}>
                <ScrollView>
                    <View style={[AppStyles.compContainer, { alignItems: 'center' }]}>
                        <View>
                            <UserImage
                                source={Images.user1}
                                size={totalSize(15)}
                            />
                            <View style={{ position: 'absolute', top: -2.5, right: -2.5 }}>
                                <View style={[{ height: totalSize(4), width: totalSize(4), borderRadius: 100, backgroundColor: Colors.appBgColor1, borderWidth: 0.5, borderColor: Colors.appColor1 }, AppStyles.center]}>
                                    <Icon name="edit-2" type="feather" size={totalSize(2)} color={Colors.appColor1} />
                                </View>
                            </View>
                        </View>
                        <Text style={[AppStyles.h5, AppStyles.textGreen, { marginTop: height(2) }]}>John Doe</Text>
                    </View>
                    <InputWithIcon
                        title="First Name"
                        value='John'
                        iconName="account"
                        placeholder="First Name"
                        rightIconName="edit-2"
                        rightIconType="feather"
                    />
                    <InputWithIcon
                        title="Last Name"
                        value='Doe'
                        iconName="account-outline"
                        placeholder="Last Name"
                        rightIconName="edit-2"
                        rightIconType="feather"
                        containerStyle={styles.inputContainerStyle}
                    />
                    <InputWithIcon
                        title="Email"
                        value='john9988@gmail.com'
                        iconName="email"
                        placeholder="Email"
                        rightIconName="edit-2"
                        rightIconType="feather"
                        containerStyle={styles.inputContainerStyle}
                    />
                    <InputWithIcon
                        title="Telephone"
                        value='+448182181821'
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
                                containerStyle={{ width: width(40), height: height(6), marginRight: 5, borderRadius: 10, borderWidth: 0, backgroundColor: Colors.appBgColor2 }}
                                selectedButtonStyle={{ backgroundColor: Colors.appColor1, borderRadius: 10 }}
                                selectedIndex={this.state.selectedGenderIndex}
                                onPress={this.updateGenderIndex}
                                textStyle={[AppStyles.textRegular, { color: Colors.appColor1 }]}
                                innerBorderStyle={{ width: 0 }}
                            />
                        }
                        containerStyle={styles.inputContainerStyle}
                    />
                    <InputWithIcon
                        title="Handicap"
                        value='14'
                        iconName="golf"
                        placeholder="Handicap"
                        rightIconName="edit-2"
                        rightIconType="feather"
                        containerStyle={styles.inputContainerStyle}
                    />
                    <InputWithIcon
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
                    />
                    <ButtonColored
                        text="Update Profile"
                        buttonStyle={{marginVertical:height(5)}}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    inputContainerStyle: {
        marginTop: height(3)
    }
})