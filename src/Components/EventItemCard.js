import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AppStyles, Colors } from '../Themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';

class EventItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { containerStyle, image, title, location, date, month } = this.props
        return (
            <TouchableOpacity activeOpacity={1} style={[AppStyles.cardView, AppStyles.shadow, { borderRadius: 10 }, containerStyle]}>
                <Image
                    source={image}
                    style={{ width: null, height: height(20), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                />
                <View style={[AppStyles.rowCompContainer, { marginVertical: height(1), marginHorizontal: width(2.5) }]}>
                    <View style={{ flex: 7.5 }}>
                        <Text style={[AppStyles.h6, AppStyles.textGreen2]}>{title}</Text>
                        <View style={[AppStyles.rowView, { marginTop: 10 }]}>
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
                        <View style={[{ height: totalSize(7.5), width: totalSize(7.5), borderRadius: 100, backgroundColor: Colors.appColor2 }, AppStyles.center]}>
                            <Text style={[AppStyles.h6, AppStyles.textWhite]}>{date}</Text>
                            <Text style={[AppStyles.textMedium, AppStyles.textWhite]}>{month}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default EventItemCard;
