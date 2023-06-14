import React, { useState, useEffect } from "react";
import axios from "axios";

import Popup from "./popupAlert";

import "./styles/vehicleState.css";

const VehicleState = () => {
	const [state, setState] = useState("Loading...");
	const [speed, setSpeed] = useState(0);
	const [responseData, setResponseData] = useState(null);
	const [uniqueStates, setUniqueStates] = useState([]);
	const [lastUpdate, setLastUpdate] = useState(null);

	const [popupTitle, setPopupTitle] = useState(null);
	const [popupMessage, setPopupMessage] = useState(null);
	const [popupType, setPopupType] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	const handlePopup = () => {
		if (showPopup) {
			setShowPopup(false);
		} else {
			setShowPopup(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.driversafe.tharindu.dev/states");
				setResponseData(response.data);

				let uniqueStates = [response.data[0]];
				let previousState = response.data[0];
				response.data.forEach((data) => {
					if (data.state !== previousState.state) {
						uniqueStates.push(data);
						previousState = data;
					}
				});

				setUniqueStates(uniqueStates);

				setLastUpdate(response.data[0].time);

				if (response.data[0].state === "Driving") {
					setState("Driving 🚗");
				} else if (response.data[0].state === "Breaked") {
					setState("Breaked 🛑");
				} else if (response.data[0].state === "Parking") {
					setState("Parked 🅿️");
				} else if (response.data[0].state === "Stopped") {
					setState("Stopped 🅿️");
				} else if (response.data[0].state === "Accidented") {
					setState("Accidented 💥");
					setPopupTitle("Accidented!!");
					setPopupMessage(
						"Accidented!! An unexpected incident has occurred, causing disruption and requiring immediate attention."
					);
					setPopupType("accident");
					setShowPopup(true);
				} else if (response.data[0].state === "Unknown") {
					setState("Unknown 🤷‍♂️");
				} else {
					setState("Unknown 🤷‍♂️");
				}

				setSpeed(response.data[0].speed);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		const interval = setInterval(fetchData, 500);
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

		if (timeDifference1 > 6000) {
			setState("Unknown 🤷‍♂️");
		}

		const utcTime = new Date(lastUpdate);
		const localTimeString = utcTime.toLocaleString("en-US", options);
		setLastUpdate(localTimeString);
	}, [responseData]);

	return (
		<React.Fragment>
			<div className="vehicle-state-container">
				<div className="vehicle-state">
					<h1>Status 🚗</h1>
					<p>Last Update: {lastUpdate}</p>
					<p>State: {state}</p>
					<p>Speed: {speed}</p>
				</div>

				<div className="vehicle-state-table">
					<table className="table table-sm table-light">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">State</th>
								<th scope="col">Speed</th>
								<th scope="col">Time</th>
							</tr>
						</thead>
						<tbody className="table-body">
							{uniqueStates &&
								uniqueStates.slice(0, 50).map((data, index) => (
									<tr
										className={
											data.state === "Accidented"
												? "table-danger"
												: data.state === "Breaked"
												? "table-warning"
												: ""
										}
										key={index}
									>
										<th scope="row">{index + 1}</th>
										<td>{data.state}</td>
										<td>{data.speed}</td>
										<td>{data.time}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{showPopup && (
				<Popup onClose={handlePopup} title={popupTitle} message={popupMessage} type={popupType} />
			)}
		</React.Fragment>
	);
};

export default VehicleState;
