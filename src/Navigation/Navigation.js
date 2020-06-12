import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors, AppStyles } from '../Themes';
import { Login, Splash } from '../Containers/AuthFlow';
import { Home, TermsCond, AboutUs, Events } from '../Containers/MainFlow';
import { DrawerIcon } from '../Components';
import { width } from 'react-native-dimension';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TermsCondStack = createStackNavigator();
const AboutUsStack = createStackNavigator();
const EventsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
const DrawerScreens = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackScreens} options={{ title: 'Home' }} />
            <Drawer.Screen name="AboutUs" component={AboutUsStackScreens} options={{ title: 'About Us' }} />
            <Drawer.Screen name="TermsCond" component={TermsCondStackScreens} options={{ title: 'Terms & Conditions' }} />
            <Drawer.Screen name="Events" component={EventsStackScreens} options={{ title: 'Events' }} />
        </Drawer.Navigator>
    )
}
const AppStackScreens = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Drawer" component={DrawerScreens} options={{ headerShown: false }} />
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

    // if (isLoading) {
    //     return <Splash />
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="App"
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
