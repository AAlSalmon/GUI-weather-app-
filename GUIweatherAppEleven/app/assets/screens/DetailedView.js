import React from 'react';
import { View, 
         ImageBackground, 
         Image, 
         StyleSheet, 
         Text
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react';
import HourlyForecast from './HourlyForecast';

function DetailedView({navigation, route}) {

    const {temp} = route.params; // Determines the temperatrue
    const {icon} = route.params; // Determines the Image displayed 
    const {weatherDesc} = route.params; // Determines the weathers description 
    const {humidity} = route.params; // Determines the humidity 

    var tempVar = Math.round(temp-273.15) // Is used to store temp variable after mathematical changes so it can be readable.

    return (
        <ImageBackground source={require('../../../app/assets/DetailsViewBackground.jpeg')} style={styles.containter}>
            {
                icon == "Clouds" ? <Image 
                    source={require('../../../app/assets/Clouds.png')} 
                    style={styles.ImageBox}/> 
                    : 
                icon == "Rain" ? <Image 
                    source={require('../../../app/assets/Rain.png')} 
                    style={styles.ImageBox}/>
                    : 
                icon == "Clear" ? <Text>Image For Clear</Text> : <Text> NULL VALUE </Text>
            }
            <Text style={styles.CelsiusBox}>{tempVar}°C</Text>
            <Text style={styles.DescriptionBox}>{weatherDesc}</Text>
            <View style={styles.ImageBox1}>{
                icon == "Rain" ? <Image style={styles.ImageBox2} source={require('../../../app/assets/NotSuitable.png')}/>
                 :
                 <Image style={styles.ImageBox2} source={require('../../../app/assets/tick2.png')}/>
            }</View>
            <Text style={styles.PromptBox}> 
                {
                    icon == "Rain" ? <Text>Not suitable for racing</Text> : <Text>Suitable for racing</Text>
                }
            </Text>
            <View style={styles.DetailedBox}>
                <Text style={{textAlign:'center', padding: 10, fontWeight: 'bold'}}>Jocky Details Box</Text>
                <Text style={styles.JBox}>Rain: {icon == "Rain" ? weatherDesc : <Text>Not Raining</Text>}</Text>
                <Text style={styles.JBox}>Muddiness: {icon == "Rain" ? <Text> is muddy</Text> : <Text>is not Muddy</Text>}</Text>
                <Text style={styles.JBox}>Humidity: {humidity}%</Text>
                <Text style={styles.JBox}>Temperature affect on the Horse: {tempVar > -15 || tempVar < 25 ? <Text>Negligable</Text> : tempVar < -15 ? <Text>Extremely Cold</Text> : tempVar > 25 ? <Text>Extremely Hot</Text> : null}</Text>
                <Text style={styles.JBox}>Temperature affect on the Ground: {tempVar > -15 || tempVar < 25 ? <Text>Normal</Text> : tempVar < -15 ? <Text>Extremely Hard</Text> : tempVar > 25 ? <Text>Extremely Soft</Text> : null}</Text>
            </View>
        </ImageBackground>        
    );
}

export default DetailedView;

const styles = StyleSheet.create({
    containter:{
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        // paddingTop: 0,
        justifyContent: 'space-evenly'
    },
    ImageBox:{ // Keep (The box for the Icon at the top )
        // flex:1,
        width: 110,
        height: 110,
        alignContent: 'center'
        // resizeMode: 'cover'
    },
    DetailedBox:{ // Keep (The box that contains the JBoxes for details)
        flex: 0.3, 
        padding:10,
        backgroundColor: 'beige',
        minHeight: 420,
        minWidth: 400,
        borderRadius: 5
    },    
    JBox:{ // Keep (The JBoxes that have the jocket details specifics)
        margin: 5,
        padding:15,
        backgroundColor: 'orange'
    },
    CelsiusBox:{// For the degrees celsius 
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20
        // backgroundColor: 'blue'
    },
    DescriptionBox:{ // For the weather description
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10
    },
    PromptBox:{ // For the prompt
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10
    },
    ImageBox1:{ // For the icons of the Prompt (The padding around it)
        height: 50,
        width: 50,
    },
    ImageBox2:{ // For the icons of the Prompt (The actual image itself)
        flex: 1, 
        height: 50, 
        width: 50, 
        resizeMode:'cover'
    }

})