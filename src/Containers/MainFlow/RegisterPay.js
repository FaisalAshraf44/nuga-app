import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AppStyles, Images, FontSize} from '../../Themes';
import {
  EventItemCard,
  InputWithIcon,
  Input,
  ButtonColored,
} from '../../Components';
import Stripe from 'react-native-stripe-api';
import Toast from 'react-native-simple-toast';

import {height, width} from 'react-native-dimension';
import {
  getData,
  getAllOfCollection,
  updateEventParticipants,
} from '../../Backend/utility';
import moment from 'moment';
import {_retrieveData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class RegisterPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      events: [],
      card_number: '',
      expiry: '',
      cvc: '',
      buttonLoading: false,
      eventData: '',
    };
  }

  async componentDidMount() {
    const {event} = this.props.route.params;

    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);
    this.setState({eventData: event});
  }
  validate = () => {
    const {card_number, expiry, cvc} = this.state;
    if (card_number == '') {
      Toast.show('The card number cannot be empty');
      return false;
    }
    if (expiry == '') {
      Toast.show('The expiry date cannot be empty');
      return false;
    }
    if (cvc == '') {
      Toast.show('The CVC cannot be empty');
      return false;
    }
    return true;
  };

  onSubmit = async () => {
    const {card_number, expiry, cvc} = this.state;
    const validated = this.validate();

    if (validated) {
      this.setState({loading: true});

      // const apiKey = 'pk_test_vArD0VAS7hAFdpSxOFG3Rxcc00Shqwwmbd';
      const apiKey = 'pk_test_A3714XWMkYLbI1hWdyzyXQFc000Z2qU0a1';
      const client = new Stripe(apiKey);

      const token = await client
        .createToken({
          number: card_number.replace(/ /g, ''),
          exp_month: expiry.split('/')[0],
          exp_year: expiry.split('/')[1],
          cvc: cvc,
          address_zip: '12345',
        })
        .then(async i => {
          console.log('create card response:', i);

          if (i.error) {
            // alert(i.error.message);
            Toast.show(i.error.message);

            this.setState({loading: false});
          } else {
            this.charge(i.id);
          }
        })
        .catch(err => {
          console.log('create card error:', err);

          // alert(err.error.message);
          this.setState({loading: false});
        });
    }
  };

  charge = async (i, account) => {
    const {event} = this.props.route.params;

    let amount =
      this.userData && this.userData.membership == 'Paid'
        ? event.fee
        : event.guestfee;

    amount = amount * 100;

    console.log('id:', i);
    const body = {};
    (body['amount'] = amount),
      (body['currency'] = 'gbp'),
      (body['source'] = i),
      (body['description'] = `${this.userData.name}(${
        this.userData.email
      }) paid "${event.name}" event fee.`);

    if (event.entry) {
      let data = await fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data in request body
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          // Authorization: `Bearer sk_test_bVdj46Z3I2vwit1szFtGnh2300SM339QAy`,
          Authorization: `Bearer sk_test_51GduKwJaK789YjBS4J1rwt9OmBScSeVRVsVY8MpsIDenP5KEPxOWT54rgM8ceL3KyuJ6UJOCPyFBLH80Um3kiLao000IeqWiAx`,

          // "Stripe-Account": account
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(body)
          .map(key => key + '=' + body[key])
          .join('&'),
      });

      let commits = await data.json().then(async response => {
        console.log(response);
        if (response.status == 'succeeded') {
          // Toast.show('Paid succesfully');

          let newParticipant = {};
          newParticipant.userId = this.userData.uuid;
          newParticipant.paid = true;
          newParticipant.withdrawn = false;
          this.saveParticiapnts(newParticipant);
        } else {
          console.log('Error:', response.error.message);
          this.setState({loading: false});
        }
      });
    } else {
      Toast.show('Event Entry is closed');
    }
  };

  saveParticiapnts = newParticipant => {
    const {event} = this.props.route.params;

    this.setState({loading: true});
    let updatedParticipants = event.participants ? event.participants : [];
    let exists = false;
    let withdrawn = false;
    let registered = false;
    updatedParticipants.forEach(element => {
      if (element.userId == newParticipant.userId) {
        if (element.withdrawn == true) {
          element.withdrawn = false;
          element.paid = true;
          exists = false;
          registered = true;
          withdrawn = true;
        } else {
          exists = false;
          registered = true;
        }
      }
    });

    if (!withdrawn && !registered) {
      updatedParticipants.push(newParticipant);
    }

    if (!exists) {
      updateEventParticipants(event.uuid, updatedParticipants)
        .then(response => {
          this.setState({
            loading: false,
          });
          Toast.show('Registered & Paid successfully');
          this.props.route.params.load();
          this.props.navigation.goBack();
          // this.loadAllData();
        })
        .catch(err => {
          this.setState({
            loading: false,
          });
          Toast.show(err);
        });
    } else {
      Toast.show('You are already registered in this event');
      this.setState({loading: false});
    }
  };

  render() {
    // const {events} = this.state;
    const {event} = this.props.route.params;
    // console.log('======:', this.props.route);
    const {navigate} = this.props.navigation;
    const {card_number, buttonLoading, loading, expiry, cvc} = this.state;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -100;

    return (
      <View style={AppStyles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <KeyboardAwareScrollView>
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
              price={
                this.userData && this.userData.membership == 'Paid'
                  ? event.fee
                  : event.guestfee
              }
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
                keyboardType="number-pad"
                value={card_number}
                onChangeText={text => {
                  this.setState({card_number: text});
                }}
                iconName="credit-card"
                placeholder="1234 5678 1234 5678"
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 16}}>
              <Input
                title="Expiry"
                maxLength={5}
                value={expiry}
                keyboardType="number-pad"
                onChangeText={text => {
                  if (text.length == 2) {
                    this.setState({expiry: text + '/'});
                  } else {
                    this.setState({expiry: text});
                  }
                }}
                containerStyle={{width: width(50)}}
                iconName="credit-card"
                placeholder="MM / YY"
              />
              <Input
                title="CVC"
                //   value="John"
                keyboardType="number-pad"
                value={cvc}
                onChangeText={text => {
                  this.setState({cvc: text});
                }}
                containerStyle={{width: width(50)}}
                iconName="credit-card"
                placeholder="123"
              />
            </View>

            <ButtonColored
              loading={loading}
              // onPress={th}
              onPress={() => this.onSubmit()}
              text={`Register & Pay (£ ${
                this.userData && this.userData.membership == 'Paid'
                  ? event.fee
                  : event.guestfee
              })`}
              buttonStyle={{marginVertical: height(5)}}
            />
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default RegisterPay;
