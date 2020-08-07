import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {AppStyles, Images, FontSize} from '../../Themes';
import {EventItemCard} from '../../Components';
import {height} from 'react-native-dimension';
import {saveData, getAllOfCollection} from '../../Backend/utility';
import moment from 'moment';
import {_retrieveData} from '../../Backend/AsyncFuncs';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      events: [],
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);
    const events = await getAllOfCollection('Events');
    const upcomming_events = events.filter(element => {
      let date = moment(new Date(element.date.seconds * 1000));
      let curentDate = new Date();
      return date.diff(curentDate, 'days') > 0 && element.status == true;
    });
    this.setState({loading: false, events: upcomming_events});
  }

  renderEvents = ({data, onPress}) => {
    const {events} = this.state;
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <>
            <View
              style={[
                AppStyles.cardView,
                {padding: 16, marginTop: height(2.5)},
              ]}>
              <Text
                style={[
                  AppStyles.h6,
                  AppStyles.textGreen2,
                  AppStyles.textCenter,
                ]}>
                WELCOME TO NIGERIA-UK GOLFING ASSOCIATION (NUGA)
              </Text>

              <Text
                style={[
                  AppStyles.textMedium,
                  AppStyles.textGray,
                  FontSize.small,
                ]}>
                NUGA is an organisation of UK resident Nigerians (including
                non-Nigerian friends, associates and affiliates) who play golf,
                support charity and develop friendship.
              </Text>
              <Text
                style={[
                  AppStyles.textMedium,
                  AppStyles.textGray,
                  FontSize.medium,
                ]}>
                Members have a deep passion for the game of golf as they do for
                supporting charity, good causes and strong family values.
                Non-golfers who believe in NUGA’s motto of “Friendship,
                Integrity and Charity” are also members of the association.
              </Text>
            </View>
            <FlatList
              data={events}
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
                    date={moment(new Date(item.date.seconds * 1000)).format(
                      'D',
                    )}
                    month={moment(new Date(item.date.seconds * 1000)).format(
                      'MMM, YYYY',
                    )}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    );
  };
  render() {
    const {events} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={AppStyles.mainContainer}>
        <this.renderEvents
          data={events}
          onPress={item =>
            navigate('eventDetail', {
              id: item.uuid,
              item: {type: 'upcomming'},
            })
          }
        />
      </View>
    );
  }
}

export default Home;
