/**
 * Ryan Lehman
 */

import React, { Component } from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//Creates the holder for the access token once called for along with boolean value to change the view
var accessToken = '';
var isLoading = false;


export default class App extends Component<{}> {
  //Constructs a function to listen to the passed in url state and sets up an OAuth request to acquire a token
  _onNavigationStateChange(webViewState){
    //Check to see if the webview has changed to the redirect url
    if ((webViewState.url).charAt(12)== 'p') {
      //Parses out the access code from the api request
      const codeWords = (webViewState.url).split('=');
      const finalWord = codeWords[1].split('&');
      var form = new FormData();
      //Constructs the correct data to be used for the request
      form.append('grant_type', "authorization_code");
      form.append('client_id', 'nprone_trial_Jkfw5AVwNSjh');
      form.append('client_secret', 'pT7GqjilFKWOdeP4RH5RFqE5Lwb7OYu8Rx8FciCC');
      form.append('code', finalWord[0]);
      form.append('redirect_uri', 'https://www.pubnub.com');
      
      var request = fetch('https://api.npr.org/authorization/v2/token', {
        method: 'POST',
        body: form,
        headers: new Headers({
          'Content-Type': "application/x-www-form-urlencoded"
      })

      }).then((response) => {
        console.log((response))
        //Parses out only the access token and assigns it to a storage value
        accessToken = (JSON.stringify(response).split('access_token'))[1].substr(5).split('\\')[0];
        display = accessToken;
        this.accessToken = accessToken;
        this.setState({
              text: accessToken
        })
      console.log(accessToken)
      })
      //Changes the view to the final screen to show the user the access token generated
      isLoading = 'random';
      this.forceUpdate();
    } 
  }
  //Confirms in the log that the button has been recognized and changes the view to show the webview
  _handlePress() {
    console.log('Pressed!');
    isLoading = true;
    this.forceUpdate();
  }
  //Constructs the storage unit for the access token to be displayed to the user
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  
  render() {
    //Shows a screen that prompts the user for login features using a webview screen
    if (isLoading == true) {
      return (
        <View style={styles.container}>
          <WebView
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
            source={{uri: 'https://api.npr.org/authorization/v2/authorize?client_id=nprone_trial_Jkfw5AVwNSjh&state=eft68jrd3r74fpc7Grni&redirect_uri=https%3A%2F%2Fwww.pubnub.com&response_type=code&scope=localactivation'}}
            style={styles.video}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
           />
        </View>)
    //Begins the app by displaying a login button to the user
    } else if (isLoading == false) {
        return (
          <View style={styles.container}>
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
              style={{fontSize: 20, color: 'white'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._handlePress()}>
              Login!
            </Button> 
          </View>)
    //Displays the access token to the user from accessing the state variable in text
    } else {
        return (
          <View >
            <Text style={styles.title}>Acess Token:</Text>
            <Text style={styles.welcome}>{this.state.text}</Text>
          </View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color: 'blue'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 300,
    color: 'black',
    marginBottom: 5,
  },
  video: {
    marginTop: 50,
    maxHeight: 800,
    width: 320,
    flex: 1,
    borderBottomColor: "#fafafa",
    backgroundColor: "#fafafa"
  },
});
