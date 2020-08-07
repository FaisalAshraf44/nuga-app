import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {AppStyles, Images, Colors, FontSize} from '../../Themes';
import {EventItemCard} from '../../Components';
import {height, width, totalSize} from 'react-native-dimension';
import {ButtonGroup} from 'react-native-elements';
import {
  saveData,
  getAllOfCollection,
  updateEventParticipants,
} from '../../Backend/utility';
import moment from 'moment';
import {_retrieveData} from '../../Backend/AsyncFuncs';
import Toast from 'react-native-simple-toast';
import firebase from '@react-native-firebase/app';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEventsIndex: 0,
      events: [],
      loading: false,
      upcomming_events: [],
      past_events: [],
      registerLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);
    await firebase
      .firestore()
      .collection('Events')
      .onSnapshot(async doc => {
        const events = await getAllOfCollection('Events');

        const upcomming_events = events.filter(element => {
          let date = moment(new Date(element.date.seconds * 1000));
          let curentDate = new Date();
          return date.diff(curentDate, 'days') > 0 && element.status == true;
        });

        const past_events = events.filter(element => {
          let date = moment(new Date(element.date.seconds * 1000));
          let curentDate = new Date();
          return date.diff(curentDate) < 0 || !element.status;
        });

        this.setState({loading: false, events, upcomming_events, past_events});
      });
    console.log('Events:', events);
  }

  registerParticiapnts = (event, newParticipant) => {
    this.setState({registerLoading: true});
    let updatedParticipants = event.participants;
    console.log('Participants:', updatedParticipants) ? event.participants : [];
    let exists = false;
    let withdrawn = false;
    updatedParticipants.forEach(element => {
      if (element.userId == newParticipant.userId) {
        if (element.withdrawn == true) {
          element.withdrawn = false;
          exists = false;
          withdrawn = true;
        } else {
          exists = true;
        }
      }
    });

    if (!withdrawn) {
      updatedParticipants.push(newParticipant);
    }

    if (!exists) {
      updateEventParticipants(event.uuid, updatedParticipants)
        .then(response => {
          this.setState({
            registerLoading: false,
          });
          Toast.show('Registered successfully');
        })
        .catch(err => {
          this.setState({
            registerLoading: false,
          });
          Toast.show(err);
        });
    } else {
      Toast.show('You are already registered in this event');
    }
  };

  updateEventButton = selectedEventsIndex =>
    this.setState({selectedEventsIndex});
  renderUpcommingEvents = ({data, onPress}) => {
    data.sort((a, b) => {
      var nameA = moment(new Date(a.date.seconds * 1000));
      // var nameA = a.item_name.charAt(0).toUpperCase();
      var nameB = moment(new Date(b.date.seconds * 1000));
      if (nameA.diff(nameB, 'days') < 0) {
        return -1;
      }
      if (nameA.diff(nameB, 'days') > 0) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <EventItemCard
                onPress={() => onPress(item)}
                containerStyle={{
                  marginTop: index === 0 ? height(2.5) : 0,
                  marginBottom: height(2),
                }}
                image={item.image}
                title={item.name}
                location={item.location}
                date={moment(new Date(item.date.seconds * 1000)).format('D')}
                price={
                  this.userData && this.userData.membership == 'Paid'
                    ? item.fee
                    : item.guestfee
                }
                // guestPrice={item.guestfee}
                month={moment(new Date(item.date.seconds * 1000)).format(
                  'MMM, YYYY',
                )}
                showButtons={true}
                registerOnPress={newParticipant =>
                  this.registerParticiapnts(item, newParticipant)
                }
                registerLoading={this.state.registerLoading}
                payOnPress={() =>
                  Toast.show('This feature is not available yet')
                }
              />
            );
          }}
        />
      </View>
    );
  };
  renderPastEvents = ({data, onPress}) => {
    data.sort((a, b) => {
      var nameA = moment(new Date(a.date.seconds * 1000));
      // var nameA = a.item_name.charAt(0).toUpperCase();
      var nameB = moment(new Date(b.date.seconds * 1000));
      if (nameA.diff(nameB, 'days') > 0) {
        return -1;
      }
      if (nameA.diff(nameB, 'days') < 0) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <EventItemCard
                onPress={() => onPress(item)}
                containerStyle={{
                  marginTop: index === 0 ? height(2.5) : 0,
                  marginBottom: height(2),
                }}
                image={item.image}
                title={item.name}
                location={item.location}
                date={moment(new Date(item.date.seconds * 1000)).format('D')}
                month={moment(new Date(item.date.seconds * 1000)).format(
                  'MMM, YYYY',
                )}
              />
            );
          }}
        />
      </View>
    );
  };
  render() {
    const {upcomming_events, past_events, selectedEventsIndex} = this.state;
    const EventCategories = ['Upcomming', 'Past'];
    const {navigate} = this.props.navigation;
    return (
      <View style={AppStyles.mainContainer}>
        <ButtonGroup
          buttons={EventCategories}
          containerStyle={{
            borderWidth: 1,
            padding: 2.5,
            borderRadius: 10,
            height: height(7),
            borderColor: Colors.appColor1,
            marginHorizontal: width(5),
            marginVertical: height(2.5),
          }}
          selectedButtonStyle={{
            backgroundColor: Colors.appColor1,
            borderRadius: 10,
          }}
          selectedIndex={selectedEventsIndex}
          textStyle={[{fontSize: FontSize.regular}, AppStyles.textLightGray]}
          onPress={this.updateEventButton}
          innerBorderStyle={{width: 0}}
        />

        {this.state.loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : selectedEventsIndex === 0 ? (
          <this.renderUpcommingEvents
            data={upcomming_events}
            onPress={item =>
              navigate('eventDetail', {
                id: item.uuid,
                item: {type: 'upcomming'},
              })
            }
          />
        ) : (
          <this.renderPastEvents
            data={past_events}
            onPress={item =>
              navigate('eventDetail', {
                id: item.uuid,
                item: {type: 'past'},
              })
            }
          />
        )}
      </View>
    );
  }
}
