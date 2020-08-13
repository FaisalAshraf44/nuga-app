import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {AppStyles, Colors, FontFamily} from '../Themes';
import {Icon} from 'react-native-elements';
import {totalSize, height, width} from 'react-native-dimension';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      iconName,
      iconType,
      rightIconName,
      editable,
      rightIconType,
      placeholder,
      onChangeText,
      secureTextEntry,
      value,
      containerStyle,
      title,
      inputRight,
      inputContainerStyle,
      keyboardType,
      maxLength,
    } = this.props;
    return (
      <View style={[{justifyContent: 'center'}, containerStyle]}>
        <View
          style={[
            AppStyles.inputContainerColored,
            {borderWidth: 1, borderRadius: 10, borderColor: Colors.appColor1},
            inputContainerStyle,
          ]}>
          {/* <View style={{flex: 1.5, alignItems: 'center'}}>
            <Icon
              name={iconName ? iconName : 'email'}
              type={iconType ? iconType : 'material-community'}
              size={totalSize(2.5)}
              color={Colors.appColor1}
              iconStyle={{}}
            />
          </View> */}
          <View style={{flex: 8.5}}>
            <TextInput
              maxLength={maxLength ? maxLength : 3}
              keyboardType={keyboardType ? keyboardType : 'default'}
              onChangeText={onChangeText}
              value={value}
              editable={editable}
              placeholder={placeholder}
              placeholderTextColor={Colors.appTextColor5}
              secureTextEntry={secureTextEntry}
              style={[
                AppStyles.inputField,
                {width: null, height: height(7), paddingLeft: 8},
              ]}
            />
          </View>
          {title ? (
            <View
              style={{
                position: 'absolute',
                top: -totalSize(1.25),
                left: width(5),
                backgroundColor: Colors.appBgColor1,
                paddingHorizontal: width(1),
              }}>
              <Text style={[AppStyles.textMedium, AppStyles.textGreen]}>
                {title}
              </Text>
            </View>
          ) : null}
        </View>
        {rightIconName ? (
          <View style={{position: 'absolute', right: width(10)}}>
            <Icon
              name={rightIconName}
              type={rightIconType ? rightIconType : 'material-community'}
              size={totalSize(2.5)}
              color={Colors.appColor1}
              iconStyle={{}}
            />
          </View>
        ) : null}
        {inputRight ? (
          <View style={{position: 'absolute', right: width(5)}}>
            {inputRight}
          </View>
        ) : null}
      </View>
    );
  }
}

export default Input;
