import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import { CONSTANTS } from "../constants/DataConstants";
import axios from "axios";

const CurrentEvents = () => {
	const [eventsList, setEventsList] = useState([]);

	// REMOVE CODE POINT #1
	// TEMPORARY DUMMY DATA, REMOVE AFTER
	// FETCH FROM FIRESTORE WORKS
	const fetchSearchResults = () => {
		console.log("fetching now...");
		const searchTerm = "concerts in boston";
		console.log(searchTerm);
		const url = CONSTANTS.serpApiP1 + searchTerm + CONSTANTS.serpApiP2;
		axios
			.get(url)
			.then((response) => {
				let data = response.data.events_results;
				console.log(data);
				setEventsList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(async () => {
		// REMOVE CODE POINT #2
		// put firebase fetching code here and then
		// use setEventsList(<firebase data>) (it should be a list),
		// REMOVE this following line
		console.log("fetching....");
		fetchSearchResults();
	}, []);

	return (
		// outer view to encompass entire page
		<View style={{ backgroundColor: "white", height: "100%" }}>
			{/* Flatlist renders all the events, and the header component is all the 
        ui components before that  */}
			<FlatList
				ListHeaderComponent={
					<ScrollView
						style={styles.container}
						keyboardShouldPersistTaps="handled"
						alignContent="center"
					></ScrollView>
				}
				columnWrapperStyle={{ justifyContent: "space-around" }}
				data={eventsList}
				numColumns={2}
				keyExtractor={(event, idx) => idx}
				renderItem={(ev) => <EventCard event={ev.item} />}
				ListFooterComponent={<View style={{ height: 24 }}></View>}
			/>
		</View>
	);
};

export default CurrentEvents;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: "4%",
	},
	welcomeMessageText: {
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		width: "100%",
		marginTop: Constants.statusBarHeight,
		marginBottom: Constants.statusBarHeight,
	},
});