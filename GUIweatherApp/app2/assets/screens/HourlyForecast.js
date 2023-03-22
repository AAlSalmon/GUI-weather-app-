import React from 'react';
import { View, 
    ImageBackground, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity,
    Text,
    ScrollView,
    FlatList
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react';

function HourlyForecast(props) {

    const [hoursTemp, setHoursTemp] = useState();
    let [latitudeTest, setLatitudeTest] = useState("51.507351");
    let [longitudeTest, setLongitudeTest] = useState("-0.127758");

    useEffect(() => {
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=a8007d417a83d1024caf3513b131c698&cnt=24`)
        .then(res => res.json())
        .then(res => setHoursTemp(res))
        .catch(err => console.log(err))
    }, [])

    const [hours, setHours] = useState([
        {hours: "00:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '0'},
        {hours: "01:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '1'},
        {hours: "02:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '2'},
        {hours: "03:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '3'},
        {hours: "04:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '4'},
        {hours: "05:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '5'},
        {hours: "06:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '6'},
        {hours: "07:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '7'},
        {hours: "08:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '8'},
        {hours: "09:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '9'},
        {hours: "10:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '10'},
        {hours: "11:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '11'},
        {hours: "12:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '12'},
        {hours: "13:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '13'},
        {hours: "14:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '14'},
        {hours: "15:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '15'},
        {hours: "16:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '16'},
        {hours: "17:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '17'},
        {hours: "18:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '18'},
        {hours: "19:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '19'},
        {hours: "20:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '20'},
        {hours: "21:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '21'},
        {hours: "22:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '22'},
        {hours: "23:00", arrTemp: /*hoursTemp.list[0].main.temp*/"0",key: '23'},
    ])

    i = 0;

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
    forecastBar:{
        height: 80, 
        width: 400,
        // backgroundColor: 'rgba(255,255,255,0.2)',
        // borderRadius: 2
    },
    hoursBox: {
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
    ImageBox: {
        flex: 1, 
        height: 100, 
        width: 60, 
        resizeMode:'cover'
    }, 
    TextBox: {
        flex: 0.5
    }
})