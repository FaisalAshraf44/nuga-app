import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {AppStyles} from '../../Themes';
import {InputWithIcon, ButtonColored} from '../../Components';
import {height} from 'react-native-dimension';

import {_retrieveData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPassword: '',
      pass: '',
      confirmPass: '',
    };
  }

  async componentDidMount() {
    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);
  }

  async checkPasswordValidation() {
    let reg1 = /^[\w\d@$!%*#?&]{6,30}$/;
    if (reg1.test(this.state.pass) === false) {
      this.state.pass === ''
        ? Toast.show('The password cannot be empty')
        : Toast.show('The password should be atleast 6 characters long');

      return 1;
    }
    if (reg1.test(this.state.confirmPass) === false) {
      this.state.confirmPass === ''
        ? Toast.show('The confirm password cannot be empty')
        : Toast.show(
            'The confirm password should be atleast 6 characters long',
          );
      return 1;
    }
    if (this.state.pass !== this.state.confirmPass) {
      Toast.show('The paasword and confirm password must match');
      return 1;
    }
    return 0;
  }

  updatePassword = async () => {
    this.setState({loading: true});
    const validate = await this.checkPasswordValidation();
    if (validate == 0) {
      console.log('Validated');
      const user = auth().currentUser;
      const provider = firebase.auth.EmailAuthProvider;
      const credential = provider.credential(
        user.email,
        this.state.currentPassword,
      );

      user
        .reauthenticateWithCredential(credential)
        .then(async () => {
          let response = await auth().currentUser.updatePassword(
            this.state.pass,
          );
          console.log('Change pass response:', response);
          this.setState({loading: false});
          Toast.show('Password updated successfully');
          this.props.navigation.goBack();
          return true;
        })
        .catch(error => {
          this.setState({loading: false});
          Toast.show('The current password is invalid');
          return false;
        });
    }
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={AppStyles.mainContainer}>
        <ScrollView>
          <InputWithIcon
            iconName="lock"
            secureTextEntry={true}
            placeholder="Current Password"
            onChangeText={text => this.setState({currentPassword: text})}
            containerStyle={styles.inputContainerStyle}
          />
          <InputWithIcon
            iconName="lock"
            secureTextEntry={true}
            placeholder="New Password"
            onChangeText={text => this.setState({pass: text})}
            containerStyle={styles.inputContainerStyle}
          />
          <InputWithIcon
            iconName="lock"
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={text => this.setState({confirmPass: text})}
            containerStyle={styles.inputContainerStyle}
          />
          <ButtonColored
            loading={loading}
            onPress={this.updatePassword}
            text="Update Password"
            buttonStyle={{marginVertical: height(5)}}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ChangePassword;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: height(3),
  },
});
