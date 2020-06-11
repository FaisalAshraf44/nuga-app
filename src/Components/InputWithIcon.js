import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { AppStyles, Colors } from '../Themes';
import { Icon } from 'react-native-elements';
import { totalSize, height } from 'react-native-dimension';

class InputWithIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { iconName, iconType, placeholder, onChangeText, secureTextEntry, value, containerStyle } = this.props
        return (
            <View style={[AppStyles.inputContainerColored, AppStyles.shadow, { borderWidth: 1, borderRadius: 10, borderColor: Colors.appColor1 }, containerStyle]}>
                <View style={{ flex: 1.5, alignItems: 'center' }}>
                    <Icon name={iconName ? iconName : 'email'} type={iconType ? iconType : 'material-community'} size={totalSize(2.5)} color={Colors.appColor1} iconStyle={{}} />
                </View>
                <View style={{ flex: 8.5 }}>
                    <TextInput
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        style={[AppStyles.inputField, { width: null, height: height(8) }]}
                    />
                </View>
            </View>
        );
    }
}

export default InputWithIcon;
