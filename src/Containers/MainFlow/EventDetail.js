import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet } from 'react-native';
import { AppStyles, Colors, Images, FontFamily } from '../../Themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonColored, ButtonColoredSmall, UserImage, MemberItem, PairItemCard } from '../../Components';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registered_members: ['Luke Min', 'Jack Wilson', 'Max Lee', 'Adam Black', 'Jackobe Wil', 'Luke Min', 'Jack Wilson', 'Max Lee', 'Adam Black', 'Jackobe Wil'],
            pairings: [
                {
                    title: 'Group 1',
                    time: '10:00',
                    members: ['Jack Wilson', 'Max Lee',]
                },
                {
                    title: 'Group 2',
                    time: '12:00',
                    members: ['Jack Wilson', 'Max Lee',]
                },
                {
                    title: 'Group 3',
                    time: '03:00',
                    members: ['Jack Wilson', 'Max Lee',]
                }
            ]
        };
    }

    renderRegisteredMembers = ({ data }) => {
        return (
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <MemberItem
                            containerStyle={{ marginRight: width(5), marginLeft: index === 0 ? width(5) : null }}
                            image={Images.user1}
                            name={item}
                        />


                    )
                }}
            />
        )
    }
    renderPairing = ({ data }) => {
        return (
            <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return (
                        <PairItemCard
                            containerStyle={{ marginTop: index === 0 ? height(1) : null, marginBottom: height(2.5) }}
                            title={item.title}
                            time={item.time}
                            members={item.members}
                        />
                    )
                }}
            />
        )
    }
    DivisionItem = ({ division, first, second, third }) => {
        return (
            <View style={[AppStyles.compContainer]}>
                <Text style={[styles.title]}>Division {division}</Text>
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
        )
    }
    TitleWithInfo = ({ title, info }) => {
        return (
            <View style={[AppStyles.rowCompContainer,{marginTop:0,justifyContent:"flex-start"}]}>
                <Text style={[styles.title]}>{title}:</Text>
                <Text style={[styles.info]}>{info}</Text>
            </View>
        )
    }
    render() {
        const { item } = this.props.route.params
        const { registered_members, pairings } = this.state
        return (
            <View style={AppStyles.mainContainer}>
                <ScrollView>
                    <Image
                        source={item.image}
                        style={{ height: height(30), width: null }}
                    />
                    <View style={[AppStyles.rowCompContainer, {}]}>
                        <View style={{ flex: 7.5 }}>
                            <Text style={[AppStyles.h5, AppStyles.textGreen2]}>{item.title}</Text>
                            <View style={[AppStyles.rowView, { marginTop: 5 }]}>
                                <Icon
                                    name="map-marker"
                                    type="material-community"
                                    size={totalSize(2.5)}
                                    color={Colors.appTextColor4}
                                />
                                <Text style={[AppStyles.textRegular, AppStyles.textGray]}>{item.location}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2.5, alignItems: 'flex-end' }}>
                            <View style={[{ height: totalSize(10), width: totalSize(10), borderRadius: 100, backgroundColor: Colors.appColor2 }, AppStyles.center]}>
                                <Text style={[AppStyles.h6, AppStyles.textWhite]}>{item.date}</Text>
                                <Text style={[AppStyles.textMedium, AppStyles.textWhite]}>{item.month} 2020</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Colors.appColor2 }}>
                        <View style={[AppStyles.compContainer]}>
                            <Text style={[AppStyles.textRegular, AppStyles.textWhite]}>Status: {item.type === 'upcomming' ? 'Registed' : 'Registered & Paid'} </Text>
                        </View>
                    </View>
                    {
                        item.type === 'upcomming' ?
                            <View style={[AppStyles.rowCompContainer, {}]}>
                                <ButtonColoredSmall
                                    text="Register"
                                    textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                                    buttonStyle={[{ backgroundColor: Colors.appColor2 }]}
                                />
                                <ButtonColoredSmall
                                    text="Register & Pay"
                                    textStyle={[AppStyles.textRegular, AppStyles.textWhite]}
                                    buttonStyle={[{ backgroundColor: Colors.appColor2 }]}
                                />
                                <Text style={[AppStyles.textRegular, AppStyles.textGreen2]}>Withdraw</Text>
                            </View>
                            :
                            null
                    }
                    <View style={[{ backgroundColor: Colors.appBgColor2 ,marginTop:height(2.5)}]}>
                        <this.DivisionItem
                            division='1'
                            first="Mar Wilson"
                            second="Jack Thomas"
                            third="Max Lee"
                        />
                        <this.DivisionItem
                            division='2'
                            first="John Wilson"
                            second="Jack Thomas"
                            third="Max Lee"
                        />
                        <this.TitleWithInfo
                        title='NTP'
                        info="Max Lee"
                        />
                        <this.TitleWithInfo
                        title='Longest Drive'
                        info="John Wilson"
                        />
                        <this.TitleWithInfo
                        title='Lowest Grose'
                        info="Jack Thomas"
                        />
                    </View>

                    <View style={[AppStyles.compContainer, {}]}>
                        <Text style={[styles.title]}>Registered Members</Text>
                    </View>
                    <this.renderRegisteredMembers
                        data={registered_members}
                    />
                    <View style={[AppStyles.compContainer, { marginBottom: 0,marginTop:height(5) }]}>
                        <Text style={[styles.title]}>Pairings</Text>
                    </View>
                    <this.renderPairing
                        data={pairings} />
                </ScrollView>
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
        marginHorizontal: width(2.5)
        //fontFamily: FontFamily.appTextBold,

    },
    divisionSubContainer: { marginVertical: height(1.5), borderLeftWidth: 2, borderLeftColor: Colors.appColor2, paddingHorizontal: width(2.5) }
})