import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';


export default function Map({navigation}) {

	// This screen is for the location, specifically getting the auto complete search bar using Google API

	let [ latitude, setLatitude] = React.useState(51.507351) // Sets Latitdue
	let [ longitude, setLongitude] = React.useState(-0.127758) // Sets Longitude

	const [ region, setRegion ] = React.useState({
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		
		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Please enter the location whose weather you want to see"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					
					console.log("LONGITUDE:", details.geometry.location.lng)
					console.log("LATITUDE:", details.geometry.location.lat)

					setLatitude(details.geometry.location.lat);
					setLongitude(details.geometry.location.lng);

					// console.log(details, "|---|-|-|-|-|-|-|-|-|--|-|-|-|-|-|-|-|-|-|---|", data)
					// console.log(details.address_components[details.address_components.length-5])
					// console.log(data.description.split(",")[0]) // TESTING PURPOSES


					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}) 

					navigation.navigate("HomeScreen", {
						lng: details.geometry.location.lng, 
						lat: details.geometry.location.lat,
						city: details.address_components[details.address_components.length-5].short_name, //Gets city name, stupid asf but aye it works
						loc: data.description.split(",")[0]
						})
				}}
				query={{
					key: "AIzaSyC-5jwkIJFTQ2Myg0BN3JlD-bGNcwcWdZE",
					language: "en",
					components: "country:uk",
					types: "establishment",
					radius: 30000,
					location: `${latitude}, ${longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				provider="google"
			>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})
