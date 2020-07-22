import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {AppStyles, Images} from '../../Themes';
import {EventItemCard} from '../../Components';
import {height} from 'react-native-dimension';
import {saveData, getAllOfCollection} from '../../Backend/utility';
import moment from 'moment';

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
    const events = await getAllOfCollection('Events');
    this.setState({loading: false, events});
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
                  date={moment(item.date).format('D')}
                  month={moment(item.date).format('MMM, YYYY')}
                />
              );
            }}
          />
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
              item: {
                image: Images.auth_bg,
                title: 'Rush In',
                location: 'Albany Golf club',
                date: '22',
                month: 'Jun',
                type: 'past',
              },
            })
          }
        />
      </View>
    );
  }
}

export default Home;
