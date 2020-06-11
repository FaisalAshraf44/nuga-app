import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Images } from '../Themes';
import { totalSize } from 'react-native-dimension';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { size } = this.props
        const defaulSize = totalSize(10)
        return (
            <Image
                source={Images.logo}
                resizeMode="contain"
                style={{ height: size ? size : defaulSize, width: size ? size : defaulSize }}
            />
        );
    }
}

export default Logo;
