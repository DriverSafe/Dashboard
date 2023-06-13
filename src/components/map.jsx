import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import { googleMapsAPIKey } from "../config";

import MyMarker from "./myMarker";

import "./styles/map.css";

const Map = () => {
	const [response, setResponse] = useState([]);
	const [location, setLocation] = useState({ lat: 0, lng: 0 });
	const [zoom, setZoom] = useState(15);

	const distanceToMouse = (pt, mp) => {
		if (pt && mp) {
			return Math.sqrt((pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y));
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.driversafe.tharindu.dev/locations");

				const threshold = 0.0004; // Adjust the threshold as per your requirement

				const filteredData = response.data.filter((item, index, array) => {
					if (index === 0) return true; // Keep the first element

					const previousItem = array[index - 1];

					// Calculate the absolute difference between latitudes and longitudes
					const latDiff = Math.abs(item.lat - previousItem.lat);
					const lngDiff = Math.abs(item.lng - previousItem.lng);

					// Check if the difference exceeds the threshold
					return latDiff > threshold || lngDiff > threshold;
				});

				setResponse(filteredData);

				setLocation({
					lat: response.data[0].lat,
					lng: response.data[0].lng,
				});
			} catch (error) {
				console.error(error);
			}
		};

		const interval = setInterval(() => {
			fetchData();
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<React.Fragment>
			<div className="map">
				<div className="map-container">
					<GoogleMapReact
						bootstrapURLKeys={{ key: googleMapsAPIKey }}
						center={location}
						defaultZoom={zoom}
						distanceToMouse={distanceToMouse}
					>
						{response.map(({ lat, lng, _id, time }) => {
							return <MyMarker key={_id} lat={lat} lng={lng} tooltip={time} />;
						})}
					</GoogleMapReact>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Map;
