import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {saveData} from './utility';
import {_storeData} from './AsyncFuncs';
import AsyncStorage from '@react-native-community/async-storage';

export async function signUp(email, password, phone, name) {
  let success = true;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      console.log(user);
      await _storeData('Token', user.user.uid);
      await saveData('Users', user.user.uid, {
        userId: user.user.uid,
        fullName: name,
        email: email,
        mobileNumber: phone,
        paid: true,
      });
    })
    .catch(function(error) {
      success = false;
      alert(error.code + ': ' + error.message);
    });
  return success;
}

export async function signIn(email, password) {
  let success = true;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      AsyncStorage.setItem('Token', user.user.uid);
    })
    .catch(function(error) {
      success = false;
      alert(error.code + ': ' + error.message);
    });
  return success;
}

export async function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  }
}
