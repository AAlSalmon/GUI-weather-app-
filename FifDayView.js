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
import { useState } from 'react';
import { Table } from "react-table";


function FifDayView({navigation}) {

    const [days, setDays] = useState([
        { day: "Day 1", key: 'Saturday'},
        { day: "Day 2", key: 'Sunday'},
        { day: "Day 3", key: 'Monday'},
        { day: "Day 4", key: 'Tuesday'},
        { day: "Day 5", key: 'Wednesday'},
        { day: "Day 6", key: 'Thursday'},
        { day: "Day 7", key: 'Friday'},
        { day: "Day 5", key: 'Wednesday'},
        { day: "Day 6", key: 'Thursday'},
        { day: "Day 7", key: 'Friday'}
    ]);

    return (
        <View style={styles.parentView}>
            <Text style={styles.titleView}>15 Day in Advance View</Text>
            <View style={styles.tableView}>
                <Text> Title 1</Text>
                <FlatList 
                    numColumns={3}
                    data={days}
                    renderItem={({item}) => (
                        <Text style={styles.DaysBox}>{item.day}</Text>
                    )}
                /> 
                {/* <Table></Table> */}
            </View>
        </View>        
    );
}

export default FifDayView;

const styles = StyleSheet.create({
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
    }
})