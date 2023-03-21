import React from 'react';
import { View, 
         ImageBackground, 
         Image, 
         StyleSheet, 
         SafeAreaView, 
         TouchableOpacity,
         Text,
         FlatList
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';


function FifDayView({navigation, route}) {

    const {test} = route.params.test;

    const [city2, setCity2] = useState(route.params.city)

    let [cityID, setCityID] = useState(city2);

    const [fifDayData, setFifDayData] = useState();

    useEffect(() => {
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${cityID}&appid=a8007d417a83d1024caf3513b131c698&cnt=30`)
        .then(res => res.json())
        .then(res => setFifDayData(res))
        .catch(err => console.log(err))
    }, [])


    var date = new Date(); // DATE -------v

    var currentDate = new Date(date.setTime( date.getTime() + 0 * 86400000 )); 

    let balls = 14;


    const [days, setDays] = useState([
        { date: new Date(date.setTime( date.getTime() + 14 * 86400000 )), icon: balls = balls+1, key: 'Monday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Tuesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Wednesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Thursday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Friday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Saturday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: balls = balls+1, key: 'Sunday'}
    ]);
  

    const renderHeader = () => (
        <View style={styles.row}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Temp</Text>
          <Text style={styles.headerCell}>Weather</Text>
          <Text style={styles.headerCell}>Suitability</Text>
        </View>
      );

    return (
        <ImageBackground style={styles.parentView} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/DetailsViewBackground.jpeg')}>
        {
            fifDayData ? <ImageBackground style={styles.parentView} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/DetailsViewBackground.jpeg')}>
                {/* <Text style={styles.titleView}>15 Day in Advance View</Text> */}
                <View>{renderHeader()}</View>
                {
                    days.map((item) => {
                        return (
                        <TouchableOpacity onPress={ () => navigation.navigate("DetailedView",{temp:fifDayData.list[item.icon].temp.day, icon: fifDayData.list[item.icon].weather[0].main,  weatherDesc: fifDayData.list[item.icon].weather[0].description, humidity: fifDayData.list[item.icon].humidity})}>
                
                        <View style={styles.row}>
                          <Text style={styles.cell}>{item.date.toDateString()}</Text>
                          <Text style={styles.cell}>{Math.round(fifDayData.list[item.icon].temp.day-273.15)}^C</Text>
                          <View style={styles.cell}>{
                            fifDayData.list[item.icon].weather[0].main == "Clouds" ? <Image style={styles.ImageBox} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Clouds.png')}/>
                             :
                            fifDayData.list[item.icon].weather[0].main == "Rain" ? <Image style={styles.ImageBox} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/Rain.png')}/>
                             : null
                          }</View> 
                          <View style={styles.cell}>{
                            fifDayData.list[item.icon].weather[0].main == "Rain" || Math.round(fifDayData.list[item.icon].temp.day-273.15) < 10 
                                 ? <Image style={styles.ImageBox} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/NotSuitable.png')}/> 
                                 : <Image style={styles.ImageBox} source={require('/Users/abdullahalsalem/GUIweatherAppEleven/app/assets/tick2.png')}/>
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
    container: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical:30,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      padding: 5,
      fontWeight: 'bold'
    },
    parentView:{
        flex: 1
    },
    titleView:{
        borderColor: 'black',
        borderWidth: 5,
        flex: 0.08,
        backgroundColor: 'yellow'
    },
    tableView:{
        borderColor: 'black',
        borderWidth: 5,
        flex: 1,
        backgroundColor: 'lightgreen',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    DaysBox:{
        margin: 30,
        padding:10,
        backgroundColor: 'orange'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        marginBottom: 16,
      },
      headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ImageBox:{
        flex: 1, 
        height: 50, 
        width: 40, 
        resizeMode:'cover'
      }
})