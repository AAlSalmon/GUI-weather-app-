import React,{ useState, useEffect } from 'react';
import { View, 
         ImageBackground, 
         Image, 
         StyleSheet, 
         TouchableOpacity,
         Text
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function FirstScreen({navigation, route}) {
  // This is the initial screen presented for the user to see, just a first screen

    return (
    <ImageBackground style={styles.backGroundIMG} source={require('../../../app/assets/DetailsViewBackground.jpeg')}>
        <View style={styles.container}>
            <View style={styles.ImageBox}>
                <Image style={{width: 280, height: 210, alignItems: 'center', justifyContent: 'center'}}source={require('../../../app/assets/logo.jpg')}/>
            </View>
            <View style={styles.button}>
              <Text style={{fontWeight: 'bold', fontSize: 25 }}>GUI Weather App Group 49</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Map")}>
                <Text style={styles.buttonText}>Click here to enter location</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    )
}

export default FirstScreen;

const styles = StyleSheet.create({
    backGroundIMG:{ // For the background image 
        flex: 1
    },
    container: { // For the components of the screen
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
      },
      ImageBox: { // The container that holds the Image 
        width: 300,
        height: 230,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 10,
        alignItems: 'flex-start'
      },
      button: { // The styling of the button box 
        marginTop: 20,
        backgroundColor: 'orange',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: '5',
        borderColor: 'black'
      },
      buttonText: { // Text inside button 
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
      },
    });