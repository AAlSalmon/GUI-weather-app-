import React from 'react';
import { View, 
         ImageBackground, 
         Image, 
         StyleSheet, 
         TouchableOpacity,
         Text
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';


function FifDayView({navigation, route}) {
  // This screen shows the weather 15 days in advance for the jockey to view

    const [city2, setCity2] = useState(route.params.city) // Is used to get the cityID for the API Call

    let [cityID, setCityID] = useState(city2);  // Is used to get the cityID for the API Call

    const [fifDayData, setFifDayData] = useState(); // Stores the values of the weather 15 days in advance (the data)

    useEffect(() => {
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${cityID}&appid=a8007d417a83d1024caf3513b131c698&cnt=30`)
        .then(res => res.json())
        .then(res => setFifDayData(res))
        .catch(err => console.log(err))
    }, [])


    var date = new Date(); // date object to create dates

    var currentDate = new Date(date.setTime( date.getTime() + 0 * 86400000 )); // gets current date

    let balls = 14; // A counter used for incrementing values in the array


    const [days, setDays] = useState([ // the days array, which prints the dates in advance (15 days)
        { date: new Date(date.setTime( date.getTime() + 14 * 86400000 )), icon: balls = balls+1, key: 'Monday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Tuesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Wednesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Thursday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Friday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Saturday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Sunday'}
    ]);
  

    const renderHeader = () => ( // For the header (the tites of the columns, date, temp, etc)
        <View style={styles.row}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Temp</Text>
          <Text style={styles.headerCell}>Weather</Text>
          <Text style={styles.headerCell}>Suitability</Text>
        </View>
      );

    return (
        <ImageBackground style={styles.container} source={require('../../../app/assets/DetailsViewBackground.jpeg')}>
        {
            fifDayData ? <ImageBackground style={styles.container} source={require('../../../app/assets/DetailsViewBackground.jpeg')}>
                {/* <Text style={styles.titleView}>15 Day in Advance View</Text> */}
                <View>{renderHeader()}</View>
                {
                    days.map((item) => {
                        return (
                        <TouchableOpacity onPress={ () => navigation.navigate("DetailedView",{temp:fifDayData.list[item.icon].temp.day, icon: fifDayData.list[item.icon].weather[0].main,  weatherDesc: fifDayData.list[item.icon].weather[0].description, humidity: fifDayData.list[item.icon].humidity})}>
                
                        <View style={styles.row}>
                          <Text style={styles.cell}>{item.date.toDateString()}</Text>
                          <Text style={styles.cell}>{Math.round(fifDayData.list[item.icon].temp.day-273.15)}°C</Text>
                          <View style={styles.cell}>{
                            fifDayData.list[item.icon].weather[0].main == "Clouds" ? <Image style={styles.ImageBox} source={require('../../../app/assets/Clouds.png')}/>
                             :
                            fifDayData.list[item.icon].weather[0].main == "Rain" ? <Image style={styles.ImageBox} source={require('../../../app/assets/Rain.png')}/>
                             : null
                          }</View> 
                          <View style={styles.cell}>{
                            fifDayData.list[item.icon].weather[0].main == "Rain" || Math.round(fifDayData.list[item.icon].temp.day-273.15) < 10 
                                 ? <Image style={styles.ImageBox} source={require('../../../app/assets/NotSuitable.png')}/> 
                                 : <Image style={styles.ImageBox} source={require('../../../app/assets/tick2.png')}/>
                          }</View>
                        </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </ImageBackground> : null 
        }
        </ImageBackground>  
    );
}

export default FifDayView;

const styles = StyleSheet.create({
    row: { // Turns the array into rows 
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical:30,
    },
    cell: { // Styles the individual cells of data
      flex: 1,
      textAlign: 'center',
      padding: 5,
      fontWeight: 'bold'
    },
    container:{ // the general container
        flex: 1
    },
      headerCell: { // Styles the header titles
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ImageBox:{ // Styles the images shown in the weather column
        flex: 1, 
        height: 50, 
        width: 40, 
        resizeMode:'cover'
      }
})
