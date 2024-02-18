import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
import LoginScreen from "./screens/login"
import RegisterScreen from "./screens/registerScreen"
import {createStackNavigator} from "@react-navigation/stack"
import firebase from "firebase"
import {firebaseConfig} from "./config"
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions = {{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}