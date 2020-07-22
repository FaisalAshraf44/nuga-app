import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {AppStyles, Images, Colors, FontSize} from '../../Themes';
import {EventItemCard} from '../../Components';
import {height, width, totalSize} from 'react-native-dimension';
import {ButtonGroup} from 'react-native-elements';
import {saveData, getAllOfCollection} from '../../Backend/utility';
import moment from 'moment';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEventsIndex: 0,
      events: [],
      loading: false,
      upcomming_events: [
        // {
        //   image: Images.auth_bg,
        //   title: 'Hero World Challenge',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'upcomming',
        //   price: '45',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Golf Fever',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'upcomming',
        //   price: '70',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Rush In',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'upcomming',
        //   price: '59',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Go For Golf',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'upcomming',
        //   price: '45',
        // },
      ],
      past_events: [
        // {
        //   image: Images.auth_bg,
        //   title: 'Rush In',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'past',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Go For Golf',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'past',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Hero World Challenge',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'past',
        // },
        // {
        //   image: Images.auth_bg,
        //   title: 'Golf Fever',
        //   location: 'Albany Golf club',
        //   date: '22',
        //   month: 'Jun',
        //   type: 'past',
        // },
      ],
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
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

    console.log('Events:', events);
  }

  updateEventButton = selectedEventsIndex =>
    this.setState({selectedEventsIndex});
  renderUpcommingEvents = ({data, onPress}) => {
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
                date={moment(item.date).format('D')}
                price={item.fee}
                guestPrice={item.guestfee}
                month={moment(item.date).format('MMM, YYYY')}
                showButtons={true}
              />
            );
          }}
        />
      </View>
    );
  };
  renderPastEvents = ({data, onPress}) => {
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
                date={moment(item.date).format('D')}
                month={moment(item.date).format('MMM, YYYY')}
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
