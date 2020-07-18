import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {AppStyles, Images} from '../../Themes';
import {EventItemCard} from '../../Components';
import {height} from 'react-native-dimension';
import {saveData, getAllOfCollection} from '../../Backend/utility';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          image: Images.auth_bg,
          title: 'Rush In',
          location: 'Albany Golf club',
          date: '22',
          month: 'Jun',
          type: 'past',
        },
        {
          image: Images.auth_bg,
          title: 'Go For Golf',
          location: 'Albany Golf club',
          date: '22',
          month: 'Jun',
          type: 'past',
        },
        {
          image: Images.auth_bg,
          title: 'Hero World Challenge',
          location: 'Albany Golf club',
          date: '22',
          month: 'Jun',
          type: 'past',
        },
        {
          image: Images.auth_bg,
          title: 'Golf Fever',
          location: 'Albany Golf club',
          date: '22',
          month: 'Jun',
          type: 'past',
        },
      ],
    };
  }

  async componentDidMount() {
    const events = await getAllOfCollection('Events');
    console.log('Events:', events);
  }

  renderEvents = ({data, onPress}) => {
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
                title={item.title}
                location={item.location}
                date={item.date}
                month={item.month}
              />
            );
          }}
        />
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
          onPress={item => navigate('eventDetail', {item: item})}
        />
      </View>
    );
  }
}

export default Home;
