import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AppStyles, Colors, Images, FontFamily} from '../../Themes';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {
  ButtonColored,
  ButtonColoredSmall,
  UserImage,
  MemberItem,
  PairItemCard,
} from '../../Components';
import {
  getData,
  getAllOfCollection,
  updateEventParticipants,
} from '../../Backend/utility';
import {_retrieveData} from '../../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';

import moment from 'moment';
import Toast from 'react-native-simple-toast';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      registerLoading: false,
      event: {},

      registered_members: [],
      pairings: [],
    };
  }

  async componentDidMount() {
    console.log('Event id:', this.props.route.params.id);
    this.setState({loading: true});

    this.userData = await _retrieveData('userData');
    this.userData = JSON.parse(this.userData);

    this.loadAllData();
  }

  loadAllData = async () => {
    console.log('Loading');
    await firebase
      .firestore()
      .collection('Events')
      .doc(this.userData.uuid)
      .onSnapshot(async doc => {
        const event = await getData('Events', this.props.route.params.id);
        const users = await getAllOfCollection('Users');

        let registered_members = [];

        if (event.participants && event.participants.length) {
          event.participants.forEach(participant => {
            users.forEach(user => {
              if (participant.userId == user.uuid) {
                if (participant.withdrawn == false) {
                  registered_members.push(user);
                }
              }
            });
          });
        }

        this.setState({
          event,
          registered_members: registered_members,
          loading: false,
        });
      });
  };

  saveParticiapnts = newParticipant => {
    this.setState({registerLoading: true});
    let updatedParticipants = this.state.event.participants;
    console.log('Participants:', updatedParticipants)
      ? this.state.event.participants
      : [];
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

    // updatedParticipants.forEach(element => {
    //   if (element.userId == newParticipant.userId) {
    //     exists = true;
    //   }
    // });

    if (!exists) {
      // updatedParticipants.push(newParticipant);
      updateEventParticipants(this.props.route.params.id, updatedParticipants)
        .then(response => {
          this.setState({
            registerLoading: false,
          });
          Toast.show('Registered successfully');
          this.loadAllData();
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

  withdrawParticiapnt = player => {
    this.setState({withdrawLoading: true});
    let updatedParticipants = this.state.event.participants;
    console.log('Player:', player);
    let exists = false;
    updatedParticipants.forEach(element => {
      if (element.userId == player.userId) {
        exists = true;
      }
    });

    if (exists) {
      updatedParticipants.forEach(element => {
        if (element.userId == player.userId) {
          element.withdrawn = true;
        }
      });
      updateEventParticipants(this.props.route.params.id, updatedParticipants)
        .then(response => {
          this.setState({
            withdrawLoading: false,
          });
          Toast.show('Withdrawn successfully');
          this.loadAllData();
        })
        .catch(err => {
          this.setState({
            withdrawLoading: false,
          });
          Toast.show(err);
        });
    } else {
      Toast.show('You are not registered in this event');
    }
  };

  renderRegisteredMembers = ({data}) => {
    return (
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <MemberItem
              containerStyle={{
                marginRight: width(5),
                marginLeft: index === 0 ? width(5) : null,
              }}
              image={{uri: item.profileImage}}
              name={item.name}
            />
          );
        }}
      />
    );
  };
  renderPairing = ({data}) => {
    return data && data.length ? (
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <PairItemCard
              containerStyle={{
                marginTop: index === 0 ? height(1) : null,
                marginBottom: height(2.5),
              }}
              title={item.groupName}
              time={moment(item.startTime).format('LT')}
              members={item.players}
            />
          );
        }}
      />
    ) : null;
  };
  DivisionItem = ({division, first, second, third}) => {
    return (
      <View style={[AppStyles.compContainer]}>
        <Text style={[styles.title]}>{division}</Text>
        <View style={[styles.divisionSubContainer]}>
          <View style={[AppStyles.rowView]}>
            <Text style={[styles.title]}>1st:</Text>
            <Text style={[styles.info]}>{first}</Text>
          </View>
          <View style={[AppStyles.rowView]}>
            <Text style={[styles.title]}>2nd:</Text>
            <Text style={[styles.info]}>{second}</Text>
          </View>
          <View style={[AppStyles.rowView]}>
            <Text style={[styles.title]}>3rd:</Text>
            <Text style={[styles.info]}>{third}</Text>
          </View>
        </View>
      </View>
    );
  };
  TitleWithInfo = ({title, info}) => {
    return (
      <View
        style={[
          AppStyles.rowCompContainer,
          {marginTop: 0, justifyContent: 'flex-start'},
        ]}>
        <Text style={[styles.title]}>{title}:</Text>
        <Text style={[styles.info]}>{info}</Text>
      </View>
    );
  };
  render() {
    const {item} = this.props.route.params;
    const {registered_members, pairings, event} = this.state;

    // event.participant &&
    //   event.participant.find(x => x.userId === this.userData.uuid);

    let found = '';
    event.participants &&
      event.participants.forEach(element => {
        if (element.userId == this.userData.uuid) {
          found = element;
        }
      });
    console.log('Found:', found);
    return (
      <View style={AppStyles.mainContainer}>
        {this.state.loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <ScrollView>
            <View>
              <Image
                // source={item.image}
                source={{uri: event.image}}
                style={{height: height(30), width: null}}
              />
              {item.type === 'upcomming' ? (
                <View
                  style={[
                    {
                      backgroundColor: Colors.appBgColor1,
                      position: 'absolute',
                      bottom: -height(2.5),
                      left: width(5),
                      borderRadius: 50,
                      paddingVertical: 10,
                      paddingHorizontal: width(5),
                    },
                    AppStyles.shadow,
                  ]}>
                  <Text style={[AppStyles.h4, AppStyles.textGreen2]}>
                    {this.userData && this.userData.membership == 'Paid'
                      ? event.fee
                      : event.guestfee}{' '}
                    £
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={[AppStyles.rowCompContainer, {}]}>
              <View style={{flex: 7.5}}>
                <Text style={[AppStyles.h5, AppStyles.textGreen2]}>
                  {event.name}
                </Text>
                <View style={[AppStyles.rowView, {marginTop: 5}]}>
                  <Icon
                    name="map-marker"
                    type="material-community"
                    size={totalSize(2.5)}
                    color={Colors.appTextColor4}
                  />
                  <Text style={[AppStyles.textRegular, AppStyles.textGray]}>
                    {event.location}
                  </Text>
                </View>
              </View>
              <View style={{flex: 2.5, alignItems: 'flex-end'}}>
                <View
                  style={[
                    {
                      height: totalSize(10),
                      width: totalSize(10),
                      borderRadius: 100,
                      backgroundColor: Colors.appColor2,
                    },
                    AppStyles.center,
                  ]}>
                  <Text style={[AppStyles.h6, AppStyles.textWhite]}>
                    {moment(
                      new Date(event.date && event.date.seconds * 1000),
                    ).format('D')}
                  </Text>
                  <Text style={[AppStyles.textMedium, AppStyles.textWhite]}>
                    {moment(
                      new Date(event.date && event.date.seconds * 1000),
                    ).format('MMM, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{backgroundColor: Colors.appColor2}}>
              <View style={[AppStyles.compContainer]}>
                <Text style={[AppStyles.textRegular, AppStyles.textWhite]}>
                  Status:{' '}
                  {/* {found.paid&&!found.withdrawn === 'upcomming' ? 'Registed' : 'Registered & Paid'}{' '} */}
                  {found
                    ? found.paid && !found.withdrawn
                      ? 'Registered & Paid'
                      : found && found.withdrawn
                      ? 'Withdrawn'
                      : 'Registed'
                    : 'Not Registered'}
                </Text>
              </View>
            </View>
            {item.type === 'upcomming' ? (
              <View style={[AppStyles.rowCompContainer, {}]}>
                <ButtonColoredSmall
                  text="Register ONLY"
                  location={this.state.registerLoading}
                  //textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                  onPress={() => {
                    let newParticipant = {};
                    newParticipant.userId = this.userData.uuid;
                    newParticipant.paid = false;
                    newParticipant.withdrawn = false;
                    this.saveParticiapnts(newParticipant);
                  }}
                  buttonStyle={[{backgroundColor: Colors.appColor2}]}
                />
                <ButtonColoredSmall
                  text="Register & Pay"
                  //textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                  buttonStyle={[{backgroundColor: Colors.appColor2}]}
                />
                <Text
                  style={[AppStyles.textRegular, AppStyles.textGreen2]}
                  onPress={() => this.withdrawParticiapnt(found)}>
                  Withdraw
                </Text>
              </View>
            ) : null}
            <View
              style={[
                {backgroundColor: Colors.appBgColor2, marginTop: height(2.5)},
              ]}>
              {event.divisions && event.divisions.length > 0
                ? event.divisions.map(division => (
                    <this.DivisionItem
                      division={division.divisionName}
                      first={division.first}
                      second={division.second}
                      third={division.third}
                    />
                  ))
                : null}

              {/* <this.DivisionItem
                division="2"
                first="John Wilson"
                second="Jack Thomas"
                third="Max Lee"
              /> */}
              <this.TitleWithInfo title="NTP" info={event.ntp} />
              <this.TitleWithInfo
                title="Longest Drive"
                info={event.longestDrive}
              />
              <this.TitleWithInfo
                title="Lowest Grose"
                info={event.lowestGrose}
              />
            </View>

            <View style={[AppStyles.compContainer, {}]}>
              <Text style={[styles.title]}>Registered Players</Text>
            </View>
            <this.renderRegisteredMembers data={registered_members} />
            {event.groups && event.groups.length ? (
              <>
                <View
                  style={[
                    AppStyles.compContainer,
                    {marginBottom: 0, marginTop: height(5)},
                  ]}>
                  <Text style={[styles.title]}>Pairings</Text>
                </View>
                <this.renderPairing data={event.groups} />
              </>
            ) : null}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default EventDetail;
const styles = StyleSheet.create({
  title: {
    ...AppStyles.textRegular,
    fontFamily: FontFamily.appTextBold,
  },
  info: {
    ...AppStyles.textMedium,
    marginHorizontal: width(2.5),
    //fontFamily: FontFamily.appTextBold,
  },
  divisionSubContainer: {
    marginVertical: height(1.5),
    borderLeftWidth: 2,
    borderLeftColor: Colors.appColor2,
    paddingHorizontal: width(2.5),
  },
});
