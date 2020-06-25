import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppStyles, Images, Colors, FontSize } from '../../Themes';
import { EventItemCard } from '../../Components';
import { height, width, totalSize } from 'react-native-dimension';
import { ButtonGroup } from 'react-native-elements'
export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEventsIndex: 0,
            upcomming_events: [
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'upcomming',
                    price:'45'
                },
                {
                    image: Images.auth_bg,
                    title: 'Golf Fever',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'upcomming',
                    price:'70'
                },
                {
                    image: Images.auth_bg,
                    title: 'Rush In',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'upcomming',
                    price:'59'
                },
                {
                    image: Images.auth_bg,
                    title: 'Go For Golf',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'upcomming',
                    price:'45'
                }
            ],
            past_events: [
                {
                    image: Images.auth_bg,
                    title: 'Rush In',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'past'
                },
                {
                    image: Images.auth_bg,
                    title: 'Go For Golf',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'past'
                },
                {
                    image: Images.auth_bg,
                    title: 'Hero World Challenge',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'past'
                },
                {
                    image: Images.auth_bg,
                    title: 'Golf Fever',
                    location: 'Albany Golf club',
                    date: '22',
                    month: 'Jun',
                    type:'past'
                },
                
            ]
        };
    }
    updateEventButton = (selectedEventsIndex) => this.setState({ selectedEventsIndex })
    renderUpcommingEvents = ({ data, onPress }) => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <EventItemCard
                                onPress={() => onPress(item)}
                                containerStyle={{ marginTop: index === 0 ? height(2.5) : 0, marginBottom: height(2) }}
                                image={item.image}
                                title={item.title}
                                location={item.location}
                                date={item.date}
                                price={item.price}
                                month={item.month}
                                showButtons={true}
                            />
                        )
                    }}
                />
            </View>
        )
    }
    renderPastEvents = ({ data, onPress }) => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <EventItemCard
                                onPress={() => onPress(item)}
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
        const { upcomming_events,past_events, selectedEventsIndex } = this.state
        const EventCategories = ['Upcomming', 'Past']
        const {navigate}=this.props.navigation
        return (
            <View style={AppStyles.mainContainer}>
                <ButtonGroup
                    buttons={EventCategories}
                    containerStyle={{ borderWidth: 1, padding: 2.5, borderRadius: 10, height: height(7), borderColor: Colors.appColor1, marginHorizontal: width(5), marginVertical: height(2.5) }}
                    selectedButtonStyle={{ backgroundColor: Colors.appColor1, borderRadius: 10 }}
                    selectedIndex={selectedEventsIndex}
                    textStyle={[{ fontSize: FontSize.regular }, AppStyles.textLightGray]}
                    onPress={this.updateEventButton}
                    innerBorderStyle={{ width: 0 }}
                />
                {
                    selectedEventsIndex === 0 ?
                        <this.renderUpcommingEvents
                            data={upcomming_events}
                            onPress={(item)=>navigate('eventDetail',{item:item})}
                        />
                        :
                        <this.renderPastEvents
                            data={past_events}
                            onPress={(item)=>navigate('eventDetail',{item:item})}
                        />
                }
            </View>
        );
    }
}

