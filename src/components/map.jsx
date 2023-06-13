import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import { googleMapsAPIKey } from "../config";

import "./styles/map.css";

const Map = () => {
	const [location, setLocation] = useState({ lat: 6.316404739437572, lng: 80.84195002143753 });
	const [zoom, setZoom] = useState(13);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.driversafe.tharindu.dev/locations");

				setLocation({
					lat: response.data[0].lat,
					lng: response.data[0].lng,
				});
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const Marker = (props) => {
		return (
			<React.Fragment>
				<div className="pin"></div>
				<div className="pulse"></div>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<div className="map">
				<div className="map-container">
					<GoogleMapReact
						bootstrapURLKeys={{ key: googleMapsAPIKey }}
						center={location}
						defaultZoom={zoom}
					>
						<Marker lat={location["lat"]} lng={location["lng"]} />
					</GoogleMapReact>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Map;
