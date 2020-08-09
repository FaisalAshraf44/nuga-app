import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {UserImage} from '.';
import {totalSize, height} from 'react-native-dimension';
import {AppStyles} from '../Themes';

class MemberItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {containerStyle, image, name, handicap} = this.props;
    return (
      <View style={[{alignItems: 'center'}, containerStyle]}>
        <UserImage source={image} size={totalSize(5)} />
        <Text
          style={[
            AppStyles.textMedium,
            {marginTop: height(1.5), textAlign: 'center'},
          ]}>
          {name} {handicap ? `(${handicap})` : ''}
        </Text>
      </View>
    );
  }
}

export default MemberItem;
