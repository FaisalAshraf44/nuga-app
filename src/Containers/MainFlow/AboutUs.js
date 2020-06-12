import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppStyles } from '../../Themes';
import { Logo } from '../../Components';
import { totalSize } from 'react-native-dimension';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, sed condimentum est. Mauris arcu odio, vestibulum quis dapibus sit amet, finibus id turpis. Aliquam semper fringilla semper. Sed nec velit sit amet dolor pulvinar feugiat. Suspendisse blandit, nulla sed interdum egestas, nibh ex maximus arcu, non posuere sem nulla in augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mattis sapien vel sollicitudin blandit. Donec nec porttitor eros. Praesent blandit, erat non vehicula rutrum, mauris orci scelerisque urna, rutrum malesuada odio magna at felis. Fusce convallis elit in risus tincidunt ullamcorper. Aliquam maximus dolor turpis, nec commodo libero mattis ut.'
        };
    }

    render() {
        return (
            <View style={AppStyles.mainContainer}>
                <ScrollView>
                    <View style={[AppStyles.compContainer, { alignItems: 'center' }]}>
                        <Logo size={totalSize(25)} />
                    </View>
                    <View style={[AppStyles.compContainer]}>
                        <Text style={AppStyles.textRegular}>{this.state.text.repeat(3)}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default AboutUs;
