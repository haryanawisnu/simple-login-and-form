import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class Login extends Component {
  componentDidMount(){
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        // play services are available. can now configure library
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '881865539198-ur1g99kri5b0om1lsel20q27p9sfdtlq.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
      // hostedDomain: '' // specifies a hosted domain restriction
      // offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login
      // accountName: '' // [Android] specifies an account name on the device that should be used
    })
    .then(() => {
      // you can now call currentUserAsync()
    });
    GoogleSignin.currentUserAsync().then((user) => {
      if(user){
        console.log('Exist User :', user);
        this.setState({user: user});
        this.props.navigation.navigate('Home')
      }
    }).done();
  }
  handle(){
    GoogleSignin.signIn()
    .then((user) => {
      console.log('Success Login :',user);
      this.setState({user: user});
      this.props.navigation.navigate('Home')
    })
    .catch((err) => {
      console.log('Error Login :', err);
    })
    .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Welcome to SimpleApp</Text>
        <Text style={styles.desc}>please login via Google</Text>
        <GoogleSigninButton
        style={{width: 230, height: 48}}
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.handle.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80dfff',
  },
  welcomeTitle: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 100,
    color:'#00394d'
  },
  desc: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    color:'#00394d'
  },
});

export default Login;