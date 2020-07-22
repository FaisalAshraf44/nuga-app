import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import {RootContext} from './src/Backend/Context';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
