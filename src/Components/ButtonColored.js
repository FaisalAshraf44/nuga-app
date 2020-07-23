import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {AppStyles, Colors, FontSize} from '../Themes';
import {width, height, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
class ButtonColored extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      text,
      onPress,
      buttonStyle,
      textStyle,
      iconName,
      iconType,
      iconSize,
      iconColor,
      iconStyle,
      loading,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          AppStyles.buttonColord,
          AppStyles.shadow,
          {borderRadius: 10, height: height(7)},
          buttonStyle,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {iconName ? (
            <Icon
              name={iconName ? iconName : 'email-outline'}
              type={iconType ? iconType : 'material-community'}
              size={iconSize ? iconSize : totalSize(3)}
              color={iconColor ? iconColor : Colors.appColor1}
              iconStyle={[{marginRight: width(2.5)}, iconStyle]}
            />
          ) : null}
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text
              style={[
                AppStyles.buttonText,
                {color: Colors.appTextColor6, fontSize: FontSize.regular},
                textStyle,
              ]}>
              {text}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonColored;
