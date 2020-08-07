import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {AppStyles, Colors, Images} from '../Themes';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {ButtonColored} from '.';
import ButtonColoredSmall from './ButtonColoredSmall';
import MemberItem from './MemberItem';
import {ScrollView} from 'react-native-gesture-handler';

class PairItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      containerStyle,
      time,
      title,
      members,
      date,
      month,
      showButtons,
      onPress,
      GiveMargin,
    } = this.props;
    return (
      <View
        // onPress={onPress}
        activeOpacity={1}
        style={[
          AppStyles.cardView,
          AppStyles.shadow,
          {borderRadius: 10, backgroundColor: Colors.appBgColor2},
          containerStyle,
        ]}>
        <View
          style={[
            AppStyles.rowCompContainer,
            {alignItems: 'stretch', marginVertical: height(1.5)},
          ]}>
          <View style={{flex: 5, justifyContent: 'space-between'}}>
            <Text style={[AppStyles.h5]}>{title}</Text>
            <Text style={[AppStyles.textRegular]}>{time}</Text>
          </View>
          <View
            style={[
              {
                flex: 9,
                justifyContent: 'space-between',
              },
              AppStyles.rowView,
            ]}>
            <FlatList
              data={members}
              numColumns={2}
              style={{flex: 1}}
              renderItem={({item, index}) => (
                <>
                  <View style={{width: width(25)}}>
                    <MemberItem
                      image={{uri: item.profileImage}}
                      name={item.name}
                    />
                  </View>
                </>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default PairItemCard;

{
  /* <FlatList
            data={members}
            style={{backgroundColor: 'red', width: width(40)}}
            horizontal
            scrollEnabled={false}
            renderItem={({item, key}) => {
              return (
                <MemberItem image={{uri: item.profileImage}} name={item.name} />
              );
            }}
          />
        </View> */
}
