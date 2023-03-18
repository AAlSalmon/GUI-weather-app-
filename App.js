import { StatusBar } from 'expo-status-bar';
import {StyleSheet, 
        SafeAreaView,
        Dimensions,
        Platform,
        View,
        Text,
        Pressable,
        TextInput
      } from 'react-native';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './app/assets/screens/HomeScreen';
import DetailedView from './app/assets/screens/DetailedView';
import FifDayView from './app/assets/screens/FifDayView';
import Map from './app/assets/screens/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Marker from 'react-native-maps'
import TesterShit from './app/assets/screens/TesterShit';

const Stack = createNativeStackNavigator()

export default function App() {

  // console.log(Dimensions.get('screen'));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="DetailedView"
          component={DetailedView}
        />
        <Stack.Screen 
          name="FifDayView"
          component={FifDayView}
        />
        <Stack.Screen 
          name="Map"
          component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
      // <TesterShit />
      // <HomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
