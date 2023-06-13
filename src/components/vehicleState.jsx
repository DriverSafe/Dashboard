import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleState = () => {
	const [state, setState] = useState("Loading...");
	const [speed, setSpeed] = useState(0);
	const [responseData, setResponseData] = useState(null);
	const [lastUpdate, setLastUpdate] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.driversafe.tharindu.dev/states");
				setResponseData(response.data);

				setLastUpdate(response.data[0].time);
				setState(response.data[0].state);
				setSpeed(response.data[0].speed);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		const interval = setInterval(fetchData, 5000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (responseData === null) return;
		const time1 = new Date(responseData[0].time);

		const tmpcurrentTime = new Date();
		const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
		const formattedTimeString = tmpcurrentTime.toLocaleString("en-US", options);
		const currentTimeString = new Date(formattedTimeString).toISOString();
		const currentTime = new Date(currentTimeString);

		const timeDifference1 = currentTime - time1;

		if (timeDifference1 < 6000) {
			setState("Driving 🚘");
		} else {
			setState("Stopped 🅿️");
		}

		const utcTime = new Date(lastUpdate);
		const localTimeString = utcTime.toLocaleString("en-US", options);
		setLastUpdate(localTimeString);
	}, [responseData]);

	return (
		<React.Fragment>
			<h1>Status 🚗</h1>
			<p>Last Update: {lastUpdate}</p>
			<p>State: {state}</p>
			<p>Speed: {speed}</p>
		</React.Fragment>
	);
};

export default VehicleState;
