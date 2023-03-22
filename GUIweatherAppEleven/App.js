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
import FirstScreen from './app/assets/screens/FirstScreen';

const Stack = createNativeStackNavigator()

export default function App() { // Main screen

  // This screen is where the app is executed, and contains access to all the other screens, it does this using react navigation
  // Which allows us to navigate to and from different screens. 

  return (
    <NavigationContainer> 
      <Stack.Navigator>
      <Stack.Screen 
          name="FirstScreen"
          component={FirstScreen}
        />
      <Stack.Screen 
          name="Map"
          component={Map}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ // CHECK IF THIS IS NEEDED 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});