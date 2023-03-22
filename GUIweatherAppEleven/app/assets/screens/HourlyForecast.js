import React from 'react';
import { View, 
    ImageBackground, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    ScrollView,
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react';

function HourlyForecast(props) {
    // This component shows the temperature by the hour for the current day 

    const [hoursTemp, setHoursTemp] = useState(); // Gets data from API call to use
    let [latitudeTest, setLatitudeTest] = useState("51.507351"); // Latitude for API Call
    let [longitudeTest, setLongitudeTest] = useState("-0.127758"); // Longiutde for API Call

    useEffect(() => { // API CALL
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=a8007d417a83d1024caf3513b131c698&cnt=24`)
        .then(res => res.json())
        .then(res => setHoursTemp(res))
        .catch(err => console.log(err))
    }, [])

    const [hours, setHours] = useState([ // Makes array for the hours
        {hours: "00:00",key: '0'},
        {hours: "01:00",key: '1'},
        {hours: "02:00",key: '2'},
        {hours: "03:00",key: '3'},
        {hours: "04:00",key: '4'},
        {hours: "05:00",key: '5'},
        {hours: "06:00",key: '6'},
        {hours: "07:00",key: '7'},
        {hours: "08:00",key: '8'},
        {hours: "09:00",key: '9'},
        {hours: "10:00",key: '10'},
        {hours: "11:00",key: '11'},
        {hours: "12:00",key: '12'},
        {hours: "13:00",key: '13'},
        {hours: "14:00",key: '14'},
        {hours: "15:00",key: '15'},
        {hours: "16:00",key: '16'},
        {hours: "17:00",key: '17'},
        {hours: "18:00",key: '18'},
        {hours: "19:00",key: '19'},
        {hours: "20:00",key: '20'},
        {hours: "21:00",key: '21'},
        {hours: "22:00",key: '22'},
        {hours: "23:00",key: '23'},
    ])

    i = 0; // Used for incrementing values in the array

    return (
        <View style={styles.forecastBar}>
        {
            hoursTemp ? <View style={styles.forecastBar}>
                <ScrollView 
                    scrollEventThrottle={16}
                    horizontal={true}
                >
                    {hours.map((item, i) =>{
                        return (
                        <View style={ styles.hoursBox }>
                            {/* <Image 
                                source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/WeatherIcon.jpeg')} 
                                style={ styles.ImageBox }
                            /> */}
                            <Text style={ styles.TextBox }>
                                {Math.round(hoursTemp.list[i].main.temp-260.15)}°C
                                {/* {item.arrTemp} */}
                            </Text> 
                            <Text style={ styles.TextBox }>
                                {item.hours}
                            </Text> 
                        </View>
                        )
                    })}
                </ScrollView>
            </View> : null
        }
        </View>
        
    );
}

export default HourlyForecast;

const styles = StyleSheet.create({
    forecastBar:{ // Styles the forecast bar (the bar that contains the boxes)
        height: 80, 
        width: 400,
        // backgroundColor: 'rgba(255,255,255,0.2)',
        // borderRadius: 2
    },
    hoursBox: { // Styles the individual boxes
        flexDirection: 'column', 
        alignContent:'center', 
        alignItems:'center', 
        height: 60, 
        width: 80, 
        borderColor: 'black', 
        borderWidth: '2', 
        margin: 10,
        backgroundColor: 'orange',
        borderRadius: 5
    },
    // ImageBox: { // WAS used for styling icons inside the boxes but was removed, kept in case
    //     flex: 1, 
    //     height: 100, 
    //     width: 60, 
    //     resizeMode:'cover'
    // }, 
    TextBox: { // Creates space between temp and hour text values
        flex: 0.5
    }
})
