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
import HourlyForecast from './HourlyForecast';
import * as Location  from 'expo-location';
import axios from 'axios';

function HomeScreen({navigation}) {

    // const URL = `https://api.openweathermap.org/data/2.5/weather?lat=51.507351&lon=-0.127758&appid=a8007d417a83d1024caf3513b131c698`
    // const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a8007d417a83d1024caf3513b131c698'

    // const axiosRequest = require('axios')

    // axiosRequest
    //     .get(URL)
    //     .then(response => {
    //         console.log(`FUNC RESULT : ${response.data}`)
    //     })
    //     .catch(error => {
    //         console.error(`ERROR ${error}`)
    //     })

    // async function garbage() {
    //     let response = await axiosRequest.get(URL)
    //     // setWeather(response.data)
    //     console.log("Trash")
    //     console.log(response.data)
    //----------------

    // async function getWeather() {
    //     const data = await fetch(URL).then(res => res.json());
    //     setWeather(data.json());
    //     setLoadingStat(false);
    //     console.log("Test")
    //     console.log(data)
    // }

    // useEffect(() =>{
    //     getWeather();
    // });

    // let [weather, setWeather] = useState();
    // let [loadingStat, setLoadingStat] = useState(false);
    // // let [longitude, setLongitude] = useState("-74.005974");
    // // let [latitude, setLatitude] = useState("40.712776");


    let [city, setCity] = useState("Blank City");

    //--------------------------------------------

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await fetch(URL)
    //         result.json().then(json => {
    //             setWeather(json.current)
    //             setLoadingStat(false)
    //         })
    //     }
    //     fetchData();
    // },[])

    //------------------------------------------

    // const getContent = () => {
    //     return <ActivityIndicator size="large"/>
    // }


    const [date, setDate] = useState('') // Date shit

    useEffect(() => {
        var date = new Date().getDate()
        setDate(date)
    }, [])

    const cityPromptFunc = () => { //Changes location box 
        Alert.prompt("city prompt", "Hunky dory", [
            {
                text: "submit",
                onPress: (text) => {
                    setCity(text)
                    testSwitchFunc()
                } 
            },
            {
                text: "cancel",
                onPress: () => console.log("cancel was pressed")
            }
        ])
    };

    const testSwitchFunc = () => {
        console.log("Executing switch func");
        setLatitudeTest("48.856613");
        setLongitudeTest("2.352222");
        console.log("Latitude:",latitudeTest);
        console.log("Longitude:",longitudeTest);
    }

    const [data, setData] = useState();
    let [latitudeTest, setLatitudeTest] = useState("51.507351");
    let [longitudeTest, setLongitudeTest] = useState("-0.127758");

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeTest}&lon=${longitudeTest}&appid=a8007d417a83d1024caf3513b131c698`)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }, [])

    const [days, setDays] = useState([
        { date: "Date", icon: "icon", key: 'Saturday'},
        { date: "Date", icon: "icon", key: 'Sunday'},
        { date: "Date", icon: "icon", key: 'Monday'},
        { date: "Date", icon: "icon", key: 'Tuesday'},
        { date: "Date", icon: "icon", key: 'Wednesday'},
        { date: "Date", icon: "icon", key: 'Thursday'},
        { date: "Date", icon: "icon", key: 'Friday'}
    ]);

    return (
        <ImageBackground source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/horse1Background.jpeg')} style={styles.containter}>
        {
            data ? <ImageBackground source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/horse1Background.jpeg')} style={styles.containter}>
                     <TouchableOpacity onPress={ () => navigation.navigate("Map")}>
                        <Text style={styles.LocationBox}>{data.name}</Text>
                        <Text style={styles.LocationBox}>{city}</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => testSwitchFunc()}>
                        <Text style={styles.CelsiusBox}>{data.main.temp}</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={ () => navigation.navigate("DetailedView",{temp: data.main.temp}) }>
                         <Text style={styles.InfoBox}> Detailed View </Text>
                     </TouchableOpacity>
                     <HourlyForecast />
                     <View style={styles.FifdayAdvanceBox}>
                         <TouchableOpacity onPress={ () => navigation.navigate("FifDayView") }>
                             <Text>15 Day forecast, {date}</Text>
                         </TouchableOpacity>
                         {days.map((item) => {
                             return (
                                 <TouchableOpacity key = {item.key}  onPress={ () => navigation.navigate("DetailedView") }>
                                     <Text style={styles.DaysBox}>
                                        {item.key} {item.date} {item.icon}
                                         {/* <Text style={styles.ItemsBox}>{item.key} |</Text> 
                                         <Text style={styles.ItemsBox}> {item.date} |</Text>
                                         <Text style={styles.ItemsBox}> {item.icon} </Text> */}
                                     </Text>
                                 </TouchableOpacity>
                             )
                         })}
                     </View>
                     </ImageBackground> : null
            }
         </ImageBackground>
    )
}



export default HomeScreen;

const styles = StyleSheet.create({
    background:{
        flex: 1
    },
    containter:{
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        paddingTop: 0,
        // backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    LocationBox:{
        fontSize: 40,
        // fontFamily: 'calibri',
        padding:10,
        backgroundColor: 'lightblue'
    },
    CelsiusBox:{
        fontSize:20,
        padding:10,
        backgroundColor: 'lightgreen'
    },
    InfoBox:{
        fontSize:15,
        padding:10,
        backgroundColor: 'violet'
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
    FifdayAdvanceBox:{
        padding:10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        minHeight:470,
        minWidth: 400,
        flexDirection:'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
    },
    DaysBox:{
        padding:10,
        backgroundColor: 'lightgreen',
        width: 350
        // opacity: null
    },
    ItemsBox:{
        borderColor: 'black',
        borderWidth: 3
    },
    HoursBox:{
        borderColor: 'black',
        borderWidth: 3,
        padding: 15,
        margin: 10,
        backgroundColor: 'lightblue'
    },
    ScrollBox:{
        // alignItems: 'center'
        padding:10,
        backgroundColor:'lightgreen'
    }
})