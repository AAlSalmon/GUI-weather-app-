import React,{ useState, useEffect } from 'react';
import { View, 
         ImageBackground, 
         Image, 
         StyleSheet, 
         SafeAreaView, 
         TouchableOpacity,
         Pressable,
         TextInput,
         ScrollView,
         Alert,
         ActivityIndicator,
         Text
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';

function FirstScreen({navigation, route}) {


    return (
    <ImageBackground style={styles.backGroundIMG} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/DetailsViewBackground.jpeg')}>
        <View style={styles.container}>
            <View style={styles.blueBox}>
                {/* <Image style={{width: 300, height: 300}}source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Clouds.png')}/> */}
                <Text style={styles.blueBoxText}>GUI Group 49 Weather App</Text>
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
    backGroundIMG:{
        flex: 1
    },
    container: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
      },
      blueBox: {
        width: 300,
        height: 230,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 10,
        alignItems: 'flex-start'
      },
      blueBoxText:{
        padding: 10,
        fontSize: 50,
        textAlign: 'center'
      },
      button: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: '5',
        borderColor: 'black'
      },
      buttonText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
      },
    });