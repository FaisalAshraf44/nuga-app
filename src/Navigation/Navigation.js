import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors, AppStyles } from '../Themes';
import { Login, Register, ForgotPassword, ResetPassword, Splash } from '../Containers/AuthFlow';
import { Home, TermsCond, AboutUs, Events } from '../Containers/MainFlow';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthStackScreens = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen name="login" component={Login} />
            <AuthStack.Screen name="register" component={Register} />
            <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
            <AuthStack.Screen name="resetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
    )
}
const AppStackScreens = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="home" component={Home} />
            <AppStack.Screen name="termsCond" component={TermsCond} />
            <AppStack.Screen name="aboutUs" component={AboutUs} />
            <AppStack.Screen name="events" component={Events} />
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
            // initialRouteName="clientTab"
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
