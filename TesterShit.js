import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text } from 'react-native';


function TesterShit(){

    // const f2 = fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.507351&lon=-0.127758&appid=a8007d417a83d1024caf3513b131c698').then(res => {

    const [data, setData] = useState();
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.507351&lon=-0.127758&appid=a8007d417a83d1024caf3513b131c698`)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView> 
            <Text>Tester shit</Text>
            <View>{
                data ? <View>
                    <Text>{data.name}</Text>
                    <Text>{data.main.temp}</Text>
                    <Text>{data.main.temp_min}</Text>
                    <Text>{data.main.temp_max}</Text>
                    <Text>{data.main.pressure}</Text>
                </View> : null
            }</View>
        </SafeAreaView>
    );
}

export default TesterShit;