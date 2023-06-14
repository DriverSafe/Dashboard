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

	const [stateImage, setStateImage] = useState("/static/images/unknown.jpg");

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
					setStateImage("/static/images/driving.gif");
				} else if (response.data[0].state === "Breaked") {
					setState("Breaked 🛑");
					setStateImage("/static/images/breaking_3.jpg");
				} else if (response.data[0].state === "Parking") {
					setState("Parked 🅿️");
					setStateImage("/static/images/breaking_3.jpg");
				} else if (response.data[0].state === "Stopped") {
					setState("Stopped 🅿️");
					setStateImage("/static/images/breaking_3.jpg");
				} else if (response.data[0].state === "Accidented") {
					setState("Accidented 💥");
					setStateImage("/static/images/accident.jpg");
					setPopupTitle("Accidented!!");
					setPopupMessage(
						"Accidented!! An unexpected incident has occurred, causing disruption and requiring immediate attention."
					);
					setPopupType("accident");
					setShowPopup(true);
				} else if (response.data[0].state === "Unknown") {
					setState("Unknown 🤷‍♂️");
					setStateImage("/static/images/unknown.jpg");
				} else {
					setState("Unknown 🤷‍♂️");
					setStateImage("/static/images/unknown.jpg");
				}

				setSpeed(response.data[0].speed);
			} catch (error) {
				console.error(error);
				setStateImage("/static/images/unknown.jpg");
			}
		};

		fetchData();

		const interval = setInterval(fetchData, 200);
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
			setStateImage("/static/images/unknown.jpg");
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
					<p class="centered-text">Vehicle State</p>
					<div className="vehicle-state-image">
						<img src={stateImage} alt="state" />
					</div>
					<p class="centered-text-state">Last Update: {lastUpdate}</p>
					<p class="centered-text-state">State: {state}</p>
					<p class="centered-text-state">Speed: {speed}</p>
				</div>

				<div className="vehicle-state-table">
					<table className="table table-sm table-dark">
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
								uniqueStates.slice(0, 8).map((data, index) => (
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
