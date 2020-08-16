import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import {RootContext} from './src/Backend/Context';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';
import {_storeData} from './src/Backend/AsyncFuncs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRegister = async token => {
    console.log('[App] onRegister: ', token);
    await _storeData('fcmToken', token);
  };

  onNotification = notify => {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  onOpenNotification = notify => {
    console.log('[App] onOpenNotification: ', notify);
    alert('Open Notification: ' + notify.body);
  };

  async componentDidMount() {
    fcmService.registerAppWithFCM();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    localNotificationService.configure(this.onOpenNotification);
  }

  async componentWillUnmount() {
    console.log('[App] unregister');
    fcmService.unRegister();
    localNotificationService.unregister();
  }

  render() {
    return (
      <RootContext>
        <SafeAreaView style={{flex: 1}}>
          <Navigation />
        </SafeAreaView>
      </RootContext>
    );
  }
}

export default App;
