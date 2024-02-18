import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker"
import firebase from "firebase"
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
import { FlatList } from "react-native-gesture-handler";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage:"image_1",
      dropDownHeight:40,
      light_theme:true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

 fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser()
  }

  addStory=async()=>{
    if(this.state.title && this.state.description && this.state.story && this.state.moral){
      var storyData = {
        preview_image:this.state.previewImage,
        title:this.state.title,
        description:this.state.description,
        story:this.state.story,
        moral:this.state.moral,
        author:firebase.auth().currentUser.displayName,
        created_on:new Date(),
        author_uid:firebase.auth().currentUser.uid,
        likes:0
      }
      
      await firebase.database().ref("/posts/"+(Math.random().toString(36).slice(2))).set(storyData).then((snapshot)=>{})
      this.props.navigation.navigate("Feed")


    } 
    else{
      alert('Error', 'All fields are required!', [ { text: 'OK', onPress: () => console.log('OK Pressed') } ], { cancelable: false })
    }
  }  

 
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync()
        let preview_images = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png"),
      };
      

      return (
        <View style={this.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>New Story</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
          <Image style={styles.previewImage} source = {preview_images[this.state.previewImage]}/>
          <View>
          <DropDownPicker
          items = {[
           {label:"Image 1",value:"image_1"}, 
           {label:"Image 2",value:"image_2"}, 
           {label:"Image 3",value:"image_3"}, 
           {label:"Image 4",value:"image_4"}, 
           {label:"Image 5",value:"image_5"} 
          ]}
          defaultValue = {this.state.previewImage}
          open = {this.state.dropDownHeight == 170?true:false}
          onOpen = {()=>this.setState({dropDownHeight:170})}
          onClose = {()=>this.setState({dropDownHeight:40})}
          style = {{backgroundColor:"black",borderWidth:1,borderColor:"black"}}
          textStyle = {{color:this.state.dropDownHeight===170?"black":"white"}}
          onSelectItem = {(item)=>{this.setState({previewImage:item.value})}}
           />
          </View>
          <View style={styles.submitButton}>
          <TouchableOpacity onPress={()=>{this.addStory()}}>
          <Text>Submit</Text>
          </TouchableOpacity>
          </View>
          <ScrollView>
          <TextInput
          onChangeText = {(title)=>{this.setState({title})}}
          style = {this.state.light_theme?styles.inputFontLight:styles.inputFont}
          placeholder = {"Title"}
          />
          <TextInput
          onChangeText = {(description)=>{this.setState({description})}}
         style = {this.state.light_theme?styles.inputFontLight:styles.inputFont}
          placeholder = {"Description"}
          multiline = {true}
          numberOfLines = {7}
          />
          <TextInput
          onChangeText = {(story)=>{this.setState({story})}}
         style = {this.state.light_theme?styles.inputFontLight:styles.inputFont}
          placeholder = {"Story"}
           multiline = {true}
          numberOfLines = {20}
          />
          <TextInput
          onChangeText = {(moral)=>{this.setState({moral})}}
          style = {this.state.light_theme?styles.inputFontLight:styles.inputFont}
          placeholder = {"Moral of the Story"}
           multiline = {true}
          numberOfLines = {4}
          />
          <View style={styles.submitButton}>
								<Button
									onPress={() => this.addStory()}
									title='Submit'
									color='#841584'
								/>
							</View>
          </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
   containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  submitButton: { 
    marginTop: RFValue(20), alignItems: "center", justifyContent: "center" },

  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    marginTop: RFValue(10),
    fontFamily: "Bubblegum-Sans",
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    marginTop: RFValue(10),
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
});