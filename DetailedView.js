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
import { useState } from 'react';
import HourlyForecast from './HourlyForecast';

function DetailedView({navigation, route}) {




    const [jockyDetails, setJockeyDetails] = useState([
        {jockyDetails: "Rain", key: '1'},
        {jockyDetails: "Muddiness", key: '2'},
        {jockyDetails: "Humidity", key: '3'},
        {jockyDetails: "Windspeed", key: '4'},
        {jockyDetails: "etc", key: '5'},
        {jockyDetails: "etc", key: '6'},
        {jockyDetails: "etc", key: '7'},
    ])

    const {temp} = route.params;

    return (
        <View style={styles.containter}>
            {/* <Text style={styles.IconBox}>General Icon (Cloudy, Rainy, etc)</Text> */}
            <Image 
                source={
                    require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/WeatherIcon.jpeg')} 
                    style={{
                    // flex:1,
                    width: 100,
                    height: 100,
                    alignContent: 'center'
                    // resizeMode: 'cover'
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <Text>{temp}</Text>
            </TouchableOpacity>
            <Text>Location</Text>
            <HourlyForecast />
            <Text>"Suitable for racing" Prompt</Text>
            <View style={styles.DetailedBox}>
                <Text>Jocky Details Box</Text>
                {/* <Text>Rain</Text>
                <Text>Muddiness (Very muddy, etc)</Text> */}
                <FlatList 
                    numColumns={3}
                    data={jockyDetails}
                    renderItem={({item}) => (
                        <Text style={styles.JBox}>{item.jockyDetails}</Text>
                    )}
                />
            </View>
        </View>        
    );
}

export default DetailedView;

const styles = StyleSheet.create({
    containter:{
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        // paddingTop: 0,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    IconBox:{
        padding:10,
        backgroundColor: 'lightblue'
    },
    DetailedBox:{
        padding:10,
        backgroundColor: 'beige',
        minHeight: 480,
        minWidth: 400
    },
    HourlyForecastBox:{
        flex: 1,
        padding:10,
        backgroundColor: 'orange',
        minWidth: 400,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    HoursBox:{
        borderColor: 'black',
        borderWidth: 3,
        padding: 15,
        margin: 10,
        backgroundColor: 'lightblue'
    },
    JBox:{
        margin: 30,
        padding:10,
        backgroundColor: 'orange'
    }
})