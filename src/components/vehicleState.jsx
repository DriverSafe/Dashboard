import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleState = () => {
	const [isDriving, setIsDriving] = useState(false);
	const [speed, setSpeed] = useState(0);
	const [location, setLocation] = useState({ lat: 0, lng: 0 });
	const [responseData, setResponseData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.driversafe.tharindu.dev/locations");
				setResponseData(response.data); // Update the state with the response data

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

	return (
		<React.Fragment>
			<h1>Vehicle State</h1>
			<p>Is Driving: {isDriving ? "Yes" : "No"}</p>
			<p>Speed: {speed}</p>
			<p>
				Location: {location.lat}, {location.lng}
			</p>
		</React.Fragment>
	);
};

export default VehicleState;
