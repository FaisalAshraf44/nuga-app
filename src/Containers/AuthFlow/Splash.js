import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {AppStyles, Images} from '../../Themes';
import {Logo} from '../../Components';
import {totalSize, height} from 'react-native-dimension';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../../Backend/utility';
import {_storeData} from '../../Backend/AsyncFuncs';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[AppStyles.mainContainer, AppStyles.center]}>
        <Logo size={totalSize(30)} />
        <Image
          source={Images.shot}
          resizeMode="contain"
          style={{
            height: totalSize(15),
            width: totalSize(15),
            marginTop: height(5),
          }}
        />
      </View>
    );
  }
}

export default Splash;
