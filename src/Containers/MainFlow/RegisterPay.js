import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {AppStyles, Images, FontSize} from '../../Themes';
import {
  EventItemCard,
  InputWithIcon,
  Input,
  ButtonColored,
} from '../../Components';

import {height, width} from 'react-native-dimension';
import {saveData, getAllOfCollection} from '../../Backend/utility';
import moment from 'moment';
import {_retrieveData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';

class RegisterPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      events: [],
      cardNumber: '',
      expiry: '',
      cvc: '',
      buttonLoading: false,
    };
  }

  //   async componentDidMount() {
  //     this.setState({loading: true});
  //     this.userData = await _retrieveData('userData');
  //     this.userData = JSON.parse(this.userData);

  //     await firebase
  //       .firestore()
  //       .collection('Events')
  //       .onSnapshot(async doc => {
  //         const events = await getAllOfCollection('Events');
  //         const upcomming_events = events.filter(element => {
  //           let date = moment(new Date(element.date.seconds * 1000));
  //           let curentDate = new Date();
  //           return date.diff(curentDate, 'days') > 0 && element.status == true;
  //         });
  //         this.setState({loading: false, events: upcomming_events});
  //       });
  //   }

  //   renderEvents = ({data, onPress}) => {
  //     const {events} = this.state;
  //     events.sort((a, b) => {
  //       var nameA = moment(new Date(a.date.seconds * 1000));
  //       // var nameA = a.item_name.charAt(0).toUpperCase();
  //       var nameB = moment(new Date(b.date.seconds * 1000));
  //       if (nameA.diff(nameB, 'days') < 0) {
  //         return -1;
  //       }
  //       if (nameA.diff(nameB, 'days') > 0) {
  //         return 1;
  //       }
  //       // names must be equal
  //       return 0;
  //     });
  //     return (
  //       <View style={{flex: 1}}>
  //         {this.state.loading ? (
  //           <View style={{flex: 1, justifyContent: 'center'}}>
  //             <ActivityIndicator size="large" color="#00ff00" />
  //           </View>
  //         ) : (
  //           <ScrollView>
  //             <View
  //               style={[
  //                 AppStyles.cardView,
  //                 {padding: 16, marginTop: height(2.5)},
  //               ]}>
  //               <Text
  //                 style={[
  //                   AppStyles.h6,
  //                   AppStyles.textGreen2,
  //                   AppStyles.textCenter,
  //                 ]}>
  //                 WELCOME TO NIGERIA-UK GOLFING ASSOCIATION (NUGA)
  //               </Text>

  //               <Text
  //                 style={[
  //                   AppStyles.textMedium,
  //                   AppStyles.textGray,
  //                   FontSize.small,
  //                 ]}>
  //                 NUGA is an organisation of UK resident Nigerians (including
  //                 non-Nigerian friends, associates and affiliates) who play golf,
  //                 support charity and develop friendship.
  //               </Text>
  //               <Text
  //                 style={[
  //                   AppStyles.textMedium,
  //                   AppStyles.textGray,
  //                   FontSize.medium,
  //                 ]}>
  //                 Members have a deep passion for the game of golf as they do for
  //                 supporting charity, good causes and strong family values.
  //                 Non-golfers who believe in NUGA’s motto of “Friendship,
  //                 Integrity and Charity” are also members of the association.
  //               </Text>
  //             </View>
  //             <FlatList
  //               data={events}
  //               renderItem={({item, index}) => {
  //                 return (
  //                   <EventItemCard
  //                     onPress={() => onPress(item)}
  //                     containerStyle={{
  //                       marginTop: index === 0 ? height(2.5) : 0,
  //                       marginBottom: height(2),
  //                     }}
  //                     image={item.image}
  //                     title={item.name}
  //                     location={item.location}
  //                     date={moment(new Date(item.date.seconds * 1000)).format(
  //                       'D',
  //                     )}
  //                     month={moment(new Date(item.date.seconds * 1000)).format(
  //                       'MMM, YYYY',
  //                     )}
  //                   />
  //                 );
  //               }}
  //             />
  //           </ScrollView>
  //         )}
  //       </View>
  //     );
  //   };

  render() {
    // const {events} = this.state;
    const {event} = this.props.route.params;
    console.log('======:', this.props.route);
    const {navigate} = this.props.navigation;
    const {cardNumber, buttonLoading, expiry, cvc} = this.state;
    return (
      <View style={AppStyles.mainContainer}>
        {/* <this.renderEvents
          data={events}
          onPress={item =>
            navigate('eventDetail', {
              id: item.uuid,
              item: {type: 'upcomming'},
            })
          }
        /> */}

        <EventItemCard
          //   onPress={() => onPress(event)}
          containerStyle={{
            marginTop: height(2.5),
            marginBottom: height(2),
          }}
          image={event.image}
          title={event.name}
          location={event.location}
          date={moment(new Date(event.date.seconds * 1000)).format('D')}
          month={moment(new Date(event.date.seconds * 1000)).format(
            'MMM, YYYY',
          )}
        />

        <View style={{marginTop: 16}}>
          <InputWithIcon
            title="Card Number"
            //   value="John"
            value={cardNumber}
            onChangeText={text => {
              this.setState({cardNumber: text});
            }}
            iconName="credit-card"
            placeholder="1234 5678 1234 5678"
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 16}}>
          <Input
            title="Expiry"
            //   value="John"
            value={cardNumber}
            onChangeText={text => {
              this.setState({cardNumber: text});
            }}
            containerStyle={{width: width(50)}}
            iconName="credit-card"
            placeholder="MM / YY"
          />
          <Input
            title="CVC"
            //   value="John"
            value={cardNumber}
            onChangeText={text => {
              this.setState({cardNumber: text});
            }}
            containerStyle={{width: width(50)}}
            iconName="credit-card"
            placeholder="123"
          />
        </View>

        <ButtonColored
          loading={buttonLoading}
          // onPress={th}
          text="Register & Pay"
          buttonStyle={{marginVertical: height(5)}}
        />
      </View>
    );
  }
}

export default RegisterPay;
