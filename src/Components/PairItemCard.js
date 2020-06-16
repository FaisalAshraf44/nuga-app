import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AppStyles, Colors, Images } from '../Themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonColored } from '.';
import ButtonColoredSmall from './ButtonColoredSmall';
import MemberItem from './MemberItem';

class PairItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { containerStyle, time, title, members, date, month, showButtons ,onPress} = this.props
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={1} style={[AppStyles.cardView, AppStyles.shadow, { borderRadius: 10,backgroundColor:Colors.appBgColor2 }, containerStyle]}>
                <View style={[AppStyles.rowCompContainer, {  alignItems:'stretch' ,marginVertical:height(1.5)}]}>
                    <View style={{ flex: 5 ,justifyContent:'space-between'}}>
                        <Text style={[AppStyles.h5,]}>{title}</Text>
                        <Text style={[AppStyles.textRegular]}>{time}</Text>
                    </View>
                    <View style={[{ flex: 5,justifyContent:'space-between'},AppStyles.rowView]}>
                        {
                            members.map((item,key)=>{
                                return(
                                    <MemberItem
                                    image={Images.user1}
                                    name={item}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
                
            </TouchableOpacity>
        );
    }
}

export default PairItemCard;
