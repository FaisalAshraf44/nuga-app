import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppStyles, Images } from '../../Themes';
import { EventItemCard } from '../../Components';
import { height } from 'react-native-dimension';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomming_events: [
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun'
                },
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun'
                },
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun'
                },
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun'
                }
            ]
        };
    }
    renderEvents = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <EventItemCard
                                containerStyle={{ marginTop: index === 0 ? height(2.5) : 0, marginBottom: height(2) }}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                month={item.month}
                            />
                        )
                    }}
                />
            </View>
        )
    }
    render() {
        const { upcomming_events } = this.state
        return (
            <View style={AppStyles.mainContainer}>
                <this.renderEvents
                    data={upcomming_events}
                />
            </View>
        );
    }
}

export default Home;
