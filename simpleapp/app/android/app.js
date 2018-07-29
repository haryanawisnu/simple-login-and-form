
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login.component';
import Home from './Home.component';

const RootStack = createStackNavigator({
    Login: Login,
    Home: Home
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  });

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}