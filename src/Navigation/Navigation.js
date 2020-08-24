import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Colors, AppStyles, Images, FontSize, FontFamily} from '../Themes';
import {Login, Splash} from '../Containers/AuthFlow';
import {RootConsumer} from '../Backend/Context';
import {
  Home,
  TermsCond,
  AboutUs,
  Events,
  Profile,
  EventDetail,
  ChangePassword,
  RegisterPay,
} from '../Containers/MainFlow';
import {DrawerIcon, UserImage} from '../Components';
import {width, height, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {getData, updateField} from '../Backend/utility';
import {_storeData, _retrieveData} from '../Backend/AsyncFuncs';
import firebase from '@react-native-firebase/app';
import RNRestart from 'react-native-restart';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TermsCondStack = createStackNavigator();
const AboutUsStack = createStackNavigator();
const EventsStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();

let globalContext = null;

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="login" component={Login} />
    </AuthStack.Navigator>
  );
};
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'Home',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={({navigation, route}) => ({
          title: 'Home',
        })}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const TermsCondStackScreens = () => {
  return (
    <TermsCondStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'Terms & Conditions',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <TermsCondStack.Screen name="termsCond" component={TermsCond} />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </TermsCondStack.Navigator>
  );
};

const AboutUsStackScreens = () => {
  return (
    <AboutUsStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'About Us',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <AboutUsStack.Screen name="aboutus" component={AboutUs} />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </AboutUsStack.Navigator>
  );
};
const EventsStackScreens = () => {
  return (
    <EventsStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'Events',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <EventsStack.Screen name="events" component={Events} />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </EventsStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <ProfileStack.Screen name="profile" component={Profile} />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const ChangePasswordStackScreens = () => {
  return (
    <TermsCondStack.Navigator
      screenOptions={({navigation, route}) => ({
        title: 'Change Password',
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitleStyle,
        headerStyle: AppStyles.headerStyle,
        headerLeft: () => (
          <DrawerIcon
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: width(5)}}
          />
        ),
      })}>
      <TermsCondStack.Screen name="changePass" component={ChangePassword} />
    </TermsCondStack.Navigator>
  );
};

const CustomDrawerContent = props => {
  return (
    <RootConsumer>
      {context => {
        globalContext = context;
        const user = context.userData;
        return (
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 5, backgroundColor: Colors.appColor2}}>
              <ImageBackground
                source={Images.nuga_flag}
                resizeMode="contain"
                style={[AppStyles.bgContainer, {}]}>
                <View
                  style={[
                    AppStyles.mainContainer,
                    {
                      backgroundColor: Colors.appBgColor4 + '40',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <View
                    style={[
                      AppStyles.compContainer,
                      {alignItems: 'flex-start'},
                    ]}>
                    <Icon
                      name="close"
                      size={totalSize(3)}
                      color={Colors.appTextColor6}
                      onPress={() => props.navigation.closeDrawer()}
                    />
                    {/* <View style={[{ backgroundColor: Colors.appBgColor1, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 7.5,alignSelf:'flex-start',marginTop:height(1) }]}>
                                <Text style={[AppStyles.textSmall, AppStyles.textGray, {}]}>Membership Fee: <Text style={[AppStyles.textGreen,{fontFamily:FontFamily.appTextBold}]}>Paid</Text></Text>
                            </View> */}
                  </View>
                  <View style={[AppStyles.compContainer]}>
                    {user && user.profileImage ? (
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('Profile')}
                        activeOpacity={1}
                        style={{
                          alignSelf: 'center',
                          borderWidth: 5,
                          borderRadius: 100,
                          borderColor: Colors.appBgColor1,
                        }}>
                        <UserImage
                          source={{
                            uri: user.profileImage
                              ? user.profileImage
                              : 'https://lh3.googleusercontent.com/proxy/3cUh1csEsvh_CReTfD4rW8bBklAwVdBzLkw_r_sqG9sFUAyd2NcKrydmiRc3bp59YQZcDXcwIACEordDp78i_o1iogBLDV6-OirJFBiUEgyct3RkomwFc2YM9l7-7z3e4cJAvNoplYMstw',
                          }}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <View
                      style={[
                        AppStyles.rowView,
                        {justifyContent: 'space-between'},
                      ]}>
                      <Text
                        style={[
                          AppStyles.h6,
                          AppStyles.textWhite,
                          {fontSize: FontSize.h6},
                        ]}>
                        {user.name}
                      </Text>
                      <View
                        style={[
                          {
                            backgroundColor: Colors.appBgColor1,
                            borderRadius: 100,
                            paddingHorizontal: 10,
                            paddingVertical: 7.5,
                            alignSelf: 'flex-start',
                            marginTop: height(1),
                          },
                        ]}>
                        <Text
                          style={[AppStyles.textTiny, AppStyles.textGray, {}]}>
                          Membership Fee:{' '}
                          <Text
                            style={[
                              AppStyles.textGreen,
                              {fontFamily: FontFamily.appTextBold},
                            ]}>
                            {user.membership}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View style={[AppStyles.rowView, {marginTop: height(2)}]}>
                      <View
                        style={[
                          {
                            flex: 8,
                            borderRadius: 100,
                            backgroundColor: Colors.appBgColor1,
                            justifyContent: 'space-between',
                            padding: 2.5,
                          },
                          AppStyles.rowView,
                        ]}>
                        <Text
                          style={[
                            AppStyles.textMedium,
                            AppStyles.textGreen,
                            {marginLeft: width(2.5)},
                          ]}>
                          Handicap
                        </Text>
                        <View
                          style={{
                            backgroundColor: Colors.appColor1,
                            paddingHorizontal: width(5),
                            paddingVertical: height(1),
                            borderRadius: 100,
                          }}>
                          <Text
                            style={[
                              AppStyles.textMedium,
                              AppStyles.textSmall,
                              AppStyles.textWhite,
                            ]}>
                            {user.handicap}
                          </Text>
                        </View>
                      </View>
                      <View style={{flex: 2, alignItems: 'flex-end'}}>
                        <Icon
                          name="edit-2"
                          type="feather"
                          size={totalSize(2)}
                          color={Colors.appTextColor6}
                          onPress={() => props.navigation.navigate('Profile')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              {/* <View style={[{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }, AppStyles.center]}>
                    <Image source={Images.nuga_flag} resizeMode="contain" style={{ height: totalSize(25), width: totalSize(25) }} />
                </View> */}
            </View>
            <View style={{flex: 5.5}}>
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            </View>
            <View style={{flex: 1}}>
              <DrawerItem
                label="Logout"
                onPress={() => {
                  Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          // await AsyncStorage.clear();
                          await AsyncStorage.removeItem('Token');
                          await AsyncStorage.removeItem('userData');

                          await firebase.auth().signOut();
                          globalContext && globalContext.setUserData({});
                          // RNRestart.Restart();

                          // props.navigation.navigate('login');
                          props.navigation.navigate('login');
                        },
                      },
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                icon={({focused, color, size}) => (
                  <Icon
                    color={color}
                    size={size}
                    name="logout-variant"
                    type="material-community"
                  />
                )}
              />
            </View>
          </SafeAreaView>
        );
      }}
    </RootConsumer>
  );
};

const DrawerScreens = () => {
  return (
    <RootConsumer>
      {context => {
        globalContext = context;
        const user = context.userData;
        return (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
              activeTintColor: Colors.appColor1,
              inactiveTintColor: Colors.appTextColor4,
            }}>
            <Drawer.Screen
              name="Home"
              component={HomeStackScreens}
              options={{
                title: 'Home',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="home-outline"
                    type="material-community"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="AboutUs"
              component={AboutUsStackScreens}
              options={{
                title: 'About Us',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="information-outline"
                    type="material-community"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="TermsCond"
              component={TermsCondStackScreens}
              options={{
                title: 'Terms & Conditions',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="text-document"
                    type="entypo"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Events"
              component={EventsStackScreens}
              options={{
                title: 'Events',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="calendar"
                    type="antdesign"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileStackScreens}
              options={{
                title: 'Profile',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="account-outline"
                    type="material-community"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="ChangePass"
              component={ChangePasswordStackScreens}
              options={{
                title: 'Change Password',
                drawerIcon: ({color, size}) => (
                  <Icon
                    name="account-key-outline"
                    type="material-community"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        );
      }}
    </RootConsumer>
  );
};
const AppStackScreens = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Drawer"
        component={DrawerScreens}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="eventDetail"
        component={EventDetail}
        options={({navigation, route}) => ({
          title: 'Event Detail',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: AppStyles.headerTitleStyle,
          headerStyle: AppStyles.headerStyle,
          headerTintColor: Colors.appTextColor6,
        })}
      />
      <AppStack.Screen
        name="registerPay"
        component={RegisterPay}
        options={({navigation, route}) => ({
          title: 'Register & Pay',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTitleStyle: AppStyles.headerTitleStyle,
          headerStyle: AppStyles.headerStyle,
          headerTintColor: Colors.appTextColor6,
        })}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token) {
      const userData = await getData('Users', Token);

      const fcmToken = await _retrieveData('fcmToken');
      const updateFcm = updateField('Users', userData.uuid, {fcmToken});

      globalContext && globalContext.setUserData(userData);
      await _storeData('userData', JSON.stringify(userData));
      setLoggedIn(true);
      setIsLoading(!isLoading);
    } else {
      setTimeout(async () => {
        setLoggedIn(false);
        setIsLoading(!isLoading);
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <RootConsumer>
        {context => {
          globalContext = context;
          return <Splash />;
        }}
      </RootConsumer>
    );
  }

  if (loggedIn && !isLoading) {
    return (
      <RootConsumer>
        {context => {
          globalContext = context;
          const user = context.userData;
          return (
            <NavigationContainer>
              <Stack.Navigator
              //initialRouteName="App"
              >
                <Stack.Screen
                  name="App"
                  component={AppStackScreens}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          );
        }}
      </RootConsumer>
    );
  }

  return (
    <RootConsumer>
      {context => {
        globalContext = context;
        const user = context.userData;
        return (
          <NavigationContainer>
            <Stack.Navigator
            //initialRouteName="App"
            >
              <Stack.Screen
                name="Auth"
                component={AuthStackScreens}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="App"
                component={AppStackScreens}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }}
    </RootConsumer>
  );
}

export default Navigation;
