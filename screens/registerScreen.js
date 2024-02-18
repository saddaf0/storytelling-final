import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import firebase from "firebase"

import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
      confirm_password:"",
      fontsLoaded: false,
      userSignedIn: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registerUser = async (email, password,confirm_password,first_name,last_name) => {
    /* write the code to authenticate user using email and password. */
if(password == confirm_password){
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then((userCredential)=>{
    alert("User Registered")
    this.props.navigation.navigate("Login")
    firebase.database().ref("/users/"+userCredential.user.uid).set({
      email:userCredential.user.email,
      first_name:first_name,
      last_name:last_name,
      current_theme:"dark"
    })
  })
  .catch((error)=>{alert(error.message)})
}
else{
  alert("password did not match")
}



  };


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, last_name,first_name,confirm_password} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Story Telling</Text>
          <Image source={appIcon} style={styles.appIcon} />
           <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ first_name: text })}
            placeholder={"Enter First Name"}
            placeholderTextColor={"#FFFFFF"}
            autoFocus
          />
           <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ last_name: text })}
            placeholder={"Enter Last Name"}
            placeholderTextColor={"#FFFFFF"}
          />

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Enter Email"}
            placeholderTextColor={"#FFFFFF"}
          />
          <TextInput
            style={[styles.textinput, { marginTop: 20 }]}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Enter Password"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />
           <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ confirm_password: text })}
            placeholder={"Confirm Password"}
            placeholderTextColor={"#FFFFFF"}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress = {()=>{this.registerUser(email,password,confirm_password,first_name,last_name)}}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress = {()=>{this.props.navigation.navigate("Login")}}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});
