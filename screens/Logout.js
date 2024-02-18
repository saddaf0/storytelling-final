import React from "react"
import {TouchableOpacity, View,Text} from "react-native"
import firebase from "firebase"

export default class Logout extends React.Component{
  componentDidMount(){
    firebase.auth().signOut()
    this.props.navigation.navigate("Login")
  }
  render(){
    return(
      <View>
      <Text>Logout</Text>
      </View>
    )
  }
}