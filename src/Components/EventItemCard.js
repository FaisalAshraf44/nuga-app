import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AppStyles, Colors } from '../Themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonColored } from '.';
import ButtonColoredSmall from './ButtonColoredSmall';

class EventItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { containerStyle, image, title, location, date, month, showButtons ,onPress} = this.props
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={1} style={[AppStyles.cardView, AppStyles.shadow, { borderRadius: 10 }, containerStyle]}>
                <Image
                    source={image}
                    style={{ width: null, height: height(20), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                />
                <View style={[AppStyles.rowCompContainer, { marginVertical: height(1.5), marginHorizontal: width(2.5),alignItems:'stretch' }]}>
                    <View style={{ flex: 7.5,justifyContent:'space-evenly' }}>
                        <Text style={[AppStyles.h6, AppStyles.textGreen2]}>{title}</Text>
                        <View style={[AppStyles.rowView, {  }]}>
                            <Icon
                                name="map-marker"
                                type="material-community"
                                size={totalSize(2)}
                                color={Colors.appTextColor4}
                            />
                            <Text style={[AppStyles.textSmall, AppStyles.textGray]}>{location}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2.5, alignItems: 'flex-end' }}>
                        <View style={[{ height: totalSize(10), width: totalSize(10), borderRadius: 100, backgroundColor: Colors.appColor2 }, AppStyles.center]}>
                            <Text style={[AppStyles.h6, AppStyles.textWhite]}>{date}</Text>
                            <Text style={[AppStyles.textMedium, AppStyles.textWhite]}>{month} 2020</Text>
                        </View>
                    </View>
                </View>
                {
                    showButtons ?
                        <View style={[AppStyles.rowCompContainer, {marginTop:0}]}>
                            <ButtonColoredSmall
                                    text="Register"
                                    textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                                    buttonStyle={[{ backgroundColor: Colors.appColor2 }]}
                                />
                                <ButtonColoredSmall
                                    text="Register & Pay"
                                    textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                                    buttonStyle={[{ backgroundColor: Colors.appColor2 }]}
                                />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        );
    }
}

export default EventItemCard;
