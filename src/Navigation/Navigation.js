import React, { Component } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Colors, AppStyles, Images, FontSize, FontFamily } from '../Themes';
import { Login, Splash } from '../Containers/AuthFlow';
import { Home, TermsCond, AboutUs, Events, Profile, EventDetail } from '../Containers/MainFlow';
import { DrawerIcon, UserImage } from '../Components';
import { width, height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TermsCondStack = createStackNavigator();
const AboutUsStack = createStackNavigator();
const EventsStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();

const AuthStackScreens = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen name="login" component={Login} />
        </AuthStack.Navigator>
    )
}
const HomeStackScreens = () => {
    return (
        <HomeStack.Navigator
            screenOptions={({ navigation, route }) => ({
                title: 'Home',
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.headerTitleStyle,
                headerStyle: AppStyles.headerStyle,
                headerLeft: () => (
                    <DrawerIcon
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: width(5) }}
                    />
                )
            })}
        >
            <HomeStack.Screen
                name="home"
                component={Home}
                options={({ navigation, route }) => ({
                    title: 'Home',
                })}
            />
        </HomeStack.Navigator>
    )
}
const TermsCondStackScreens = () => {
    return (
        <TermsCondStack.Navigator
            screenOptions={({ navigation, route }) => ({
                title: 'Terms & Conditions',
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.headerTitleStyle,
                headerStyle: AppStyles.headerStyle,
                headerLeft: () => (
                    <DrawerIcon
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: width(5) }}
                    />
                )
            })}
        >
            <TermsCondStack.Screen name="termsCond" component={TermsCond} />
        </TermsCondStack.Navigator>
    )
}
const AboutUsStackScreens = () => {
    return (
        <AboutUsStack.Navigator
            screenOptions={({ navigation, route }) => ({
                title: 'About Us',
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.headerTitleStyle,
                headerStyle: AppStyles.headerStyle,
                headerLeft: () => (
                    <DrawerIcon
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: width(5) }}
                    />
                )
            })}
        >
            <AboutUsStack.Screen name="aboutus" component={AboutUs} />
        </AboutUsStack.Navigator>
    )
}
const EventsStackScreens = () => {
    return (
        <EventsStack.Navigator
            screenOptions={({ navigation, route }) => ({
                title: 'Events',
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.headerTitleStyle,
                headerStyle: AppStyles.headerStyle,
                headerLeft: () => (
                    <DrawerIcon
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: width(5) }}
                    />
                )
            })}
        >
            <EventsStack.Screen name="events" component={Events} />
        </EventsStack.Navigator>
    )
}
const ProfileStackScreens = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={({ navigation, route }) => ({
                title: 'Profile',
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.headerTitleStyle,
                headerStyle: AppStyles.headerStyle,
                headerLeft: () => (
                    <DrawerIcon
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: width(5) }}
                    />
                )
            })}
        >
            <ProfileStack.Screen name="profile" component={Profile} />
        </ProfileStack.Navigator>
    )
}
const CustomDrawerContent = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 5, backgroundColor: Colors.appColor2 }}>
                <ImageBackground source={Images.nuga_flag} resizeMode="contain" style={[AppStyles.bgContainer, {}]}>
                    <View style={[AppStyles.mainContainer, { backgroundColor: Colors.appBgColor4 + '40', justifyContent: 'space-between' }]}>
                    <View style={[AppStyles.compContainer,{alignItems:'flex-start'}]}>
                            <Icon name="close" size={totalSize(3)} color={Colors.appTextColor6} onPress={() => props.navigation.closeDrawer()} />
                            {/* <View style={[{ backgroundColor: Colors.appBgColor1, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 7.5,alignSelf:'flex-start',marginTop:height(1) }]}>
                                <Text style={[AppStyles.textSmall, AppStyles.textGray, {}]}>Membership Fee: <Text style={[AppStyles.textGreen,{fontFamily:FontFamily.appTextBold}]}>Paid</Text></Text>
                            </View> */}
                        </View>
                        <View style={[AppStyles.compContainer]}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Profile')}
                                activeOpacity={1}
                                style={{ alignSelf: 'center', borderWidth: 5, borderRadius: 100, borderColor: Colors.appBgColor1 }}>
                                <UserImage
                                    source={Images.user1}
                                />
                            </TouchableOpacity>
                           <View style={[AppStyles.rowView,{justifyContent:'space-between'}]}>
                           <Text style={[AppStyles.h6, AppStyles.textWhite, { fontSize: FontSize.h6 }]}>John Doe</Text>
                            <View style={[{ backgroundColor: Colors.appBgColor1, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 7.5,alignSelf:'flex-start',marginTop:height(1) }]}>
                                <Text style={[AppStyles.textTiny, AppStyles.textGray, {}]}>Membership Fee: <Text style={[AppStyles.textGreen,{fontFamily:FontFamily.appTextBold}]}>Paid</Text></Text>
                            </View>
                           </View>
                            
                            <View style={[AppStyles.rowView, { marginTop: height(2) }]}>
                                <View style={[{ flex: 8, borderRadius: 100, backgroundColor: Colors.appBgColor1, justifyContent: 'space-between', padding: 2.5 }, AppStyles.rowView]}>
                                    <Text style={[AppStyles.textMedium, AppStyles.textGreen, { marginLeft: width(2.5) }]}>Handicap</Text>
                                    <View style={{ backgroundColor: Colors.appColor1, paddingHorizontal: width(5), paddingVertical: height(1), borderRadius: 100 }}>
                                        <Text style={[AppStyles.textMedium, AppStyles.textSmall, AppStyles.textWhite,]}>14</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Icon name="edit-2" type="feather" size={totalSize(2)} color={Colors.appTextColor6} onPress={() => props.navigation.navigate('Profile')} />
                                </View>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
                {/* <View style={[{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }, AppStyles.center]}>
                    <Image source={Images.nuga_flag} resizeMode="contain" style={{ height: totalSize(25), width: totalSize(25) }} />
                </View> */}
            </View>
            <View style={{ flex: 4 }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <DrawerItem
                    label="Logout"
                    onPress={() => props.navigation.navigate('Auth')}
                    icon={({ focused, color, size }) => <Icon color={color} size={size} name='logout-variant' type="material-community" />}
                />
            </View>
        </SafeAreaView>
    );
}

const DrawerScreens = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: Colors.appColor1,
                inactiveTintColor: Colors.appTextColor4

            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeStackScreens}
                options={{
                    title: 'Home',
                    drawerIcon: ({ color, size }) => <Icon name="home-outline" type="material-community" color={color} size={size} />
                }}

            />
            <Drawer.Screen
                name="AboutUs"
                component={AboutUsStackScreens}
                options={{
                    title: 'About Us',
                    drawerIcon: ({ color, size }) => <Icon name="information-outline" type="material-community" color={color} size={size} />
                }}
            />
            <Drawer.Screen
                name="TermsCond"
                component={TermsCondStackScreens}
                options={{
                    title: 'Terms & Conditions',
                    drawerIcon: ({ color, size }) => <Icon name="text-document" type="entypo" color={color} size={size} />
                }}
            />
            <Drawer.Screen
                name="Events"
                component={EventsStackScreens}
                options={{
                    title: 'Events',
                    drawerIcon: ({ color, size }) => <Icon name="calendar" type="antdesign" color={color} size={size} />
                }} />
            <Drawer.Screen
                name="Profile"
                component={ProfileStackScreens}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ color, size }) => <Icon name="account-outline" type="material-community" color={color} size={size} />
                }} />
        </Drawer.Navigator>
    )
}
const AppStackScreens = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Drawer" component={DrawerScreens} options={{ headerShown: false }} />
            <AppStack.Screen
                name="eventDetail"
                component={EventDetail}
                options={({ navigation, route }) => ({
                    title: 'Event Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: AppStyles.headerTitleStyle,
                    headerStyle: AppStyles.headerStyle,
                    headerTintColor: Colors.appTextColor6
                })}
            />
        </AppStack.Navigator>
    )
}

function Navigation() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading)
        }, 2000);
    }, [])

       if (isLoading) {
           return <Splash />
       }

    return (
        <NavigationContainer>
            <Stack.Navigator
                //initialRouteName="App"
            >
                <Stack.Screen
                    name="Auth"
                    component={AuthStackScreens}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="App"
                    component={AppStackScreens}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
