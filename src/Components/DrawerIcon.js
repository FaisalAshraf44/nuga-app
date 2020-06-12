import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { totalSize } from 'react-native-dimension';
import { Colors } from '../Themes';

class DrawerIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { style, onPress } = this.props
        return (
            <Icon
                name="menu"
                type="material-community"
                size={totalSize(2.5)}
                color={Colors.appTextColor6}
                iconStyle={style}
                onPress={onPress}
            />
        );
    }
}

export default DrawerIcon;
