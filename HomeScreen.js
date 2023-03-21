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

function HomeScreen({navigation, route}) {

    //NOTE: I know that it's conviluted to pass the lat, lng, and city name as into variables, and then into secondary variables
    // and then into tertiary variables to use, but it was the only way that worked for me, ideally it should be immediatley passed into 
    //variables for immediate use but idk why it wouldn't work for me that way. We'll try to polish it up but don't take this as
    // a misunderstanding of react basics on our part we are aware of how it should be done. 

    const[lng, setLng] = useState(route.params.lng) //Takes input from param from previous map in longitude
    const[lat, setLat] = useState(route.params.lat) //Takes input from param from previous map in latitude
    const [city2, setCity2] = useState(route.params.city) //Takes input from param from previous map as city name

    let [latitudeTest, setLatitudeTest] = useState(lat); // Passes input from lng to the API 
    let [longitudeTest, setLongitudeTest] = useState(lng); // Passes input from lat to the API 
    let [cityID, setCityID] = useState(city2); // Passes input from city2 to the API 


    const [data, setData] = useState(); //Saves the value gotten from the bottom API, for the current weather

    useEffect(() => { //API for current weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeTest}&lon=${longitudeTest}&appid=a8007d417a83d1024caf3513b131c698`)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }, [])

    const [fifDayData, setFifDayData] = useState(); //Saves the value gotten from the bottom API, for the weather 30 days in advance 

    useEffect(() => { //API for weather 30 days in advance 
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${cityID}&appid=a8007d417a83d1024caf3513b131c698&cnt=30`)
        .then(res => res.json())
        .then(res => setFifDayData(res))
        .catch(err => console.log(err))
    }, [])

    var date = new Date(); // Creates date object

    var currentDate = new Date(date.setTime( date.getTime() + 0 * 86400000 )); // gets current date 


    const [days, setDays] = useState([ //Gets date 15 days from now and turns it into an array to be used 
        { date: new Date(date.setTime( date.getTime() + 14 * 86400000 )), icon: "icon", key: 'Monday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Tuesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Wednesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Thursday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Friday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Saturday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Sunday'}
    ]);


    return (
        <ImageBackground source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/HomeScreenBackground.jpeg')} style={styles.containter}> 
        {
            data && fifDayData ? <ImageBackground source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/HomeScreenBackground.jpeg')} style={styles.containter}>
                     <TouchableOpacity onPress={ () => navigation.navigate("Map")}> 
                        <Text style={styles.LocationBox}>{route.params.loc}</Text>
                     </TouchableOpacity>
                        <Text style={styles.CelsiusBox}>{Math.round(data.main.temp-273.15)}°C</Text> 
                     <TouchableOpacity onPress={ () => navigation.navigate("DetailedView",{temp: data.main.temp, icon: data.weather[0].main, weatherDesc: data.weather[0].description, humidity: data.main.humidity}) }> 
                         <Text style={styles.InfoBox}> Detailed View</Text>
                     </TouchableOpacity>
                     <HourlyForecast />  
                     <View style={styles.FifdayAdvanceBox}>
                         <TouchableOpacity onPress={ () => navigation.navigate("FifDayView", {test: "PASSED", city: cityID}) }>
                             <Text style={{textAlign:'center', padding: 2, fontWeight: 'bold'}}>15 Day forecast, {currentDate.toDateString()}</Text>
                         </TouchableOpacity>
                         {days.map((item, j=15) => {
                             return (
                                 <TouchableOpacity style={styles.DaysBox}key = {item.key}  onPress={ () => navigation.navigate("DetailedView",{temp:fifDayData.list[j+15].temp.day, icon: fifDayData.list[j+15].weather[0].main, weatherDesc: fifDayData.list[j+15].weather[0].description, humidity: fifDayData.list[j+15].humidity}) }>
                                     <Text > 
                                        {item.date.toDateString()} | {Math.round(fifDayData.list[j+15].temp.day-273.15)}°C  ..       
                                        {
                                            fifDayData.list[j+15].weather[0].main == "Clouds" ? <View style={styles.testBox1View}><Image style={styles.ImageBoxTEST} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Clouds.png')}/></View>
                                                :
                                            fifDayData.list[j+15].weather[0].main == "Rain" ? <View style={styles.testBox1View}><Image style={styles.ImageBoxTEST} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Rain.png')}/></View>
                                                : 
                                            fifDayData.list[j+15].weather[0].main == "Clear" ? <View style={styles.testBox1View}><Image style={styles.ImageBoxTEST} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Clouds.png')}/></View> : null
                                        } 
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
    containter:{ // Keep (Is the container for the whole screen)
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        paddingTop: 0,
        // backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    LocationBox:{ // Keep (Changes the box containing the location, the top one)
        color: 'white',
        fontSize: 35,
        fontWeight: '400',
        padding:10,
        backgroundColor: 'rgba(255, 243, 249, 0.01)',
        borderRadius: 100,
        textAlign: 'center'
    },
    CelsiusBox:{ // Keep (Changes the box containing the degrees in celius)
        color: 'white',
        fontSize:30,
        padding:10,
        backgroundColor: 'rgba(255, 243, 249, 0.01)'
    },
    InfoBox:{ // Keep (Changes the detailed view button box )
        fontSize:15,
        fontWeight: 'bold',
        padding:10,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    FifdayAdvanceBox:{ // Keep (Changes the big box on the bottom)
        // flexDirection: 'column', 
        // alignContent:'center', 
        // alignItems:'center', 
        padding:10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        minHeight: 500,
        minWidth: 400,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10
    },
    DaysBox:{ // Keep (Changes the days boxes within the above ^)
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 15,
        backgroundColor: 'rgba(199, 144, 42, 0.7)',
        width: 350
    },
    testBox1View:{
        height: 20, 
        width: 20,
    },
    ImageBoxTEST: {
        flex: 1, 
        height: 25, 
        width: 25, 
        resizeMode:'cover'
    }, 
})