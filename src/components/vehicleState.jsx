import React, { useState } from "react";

const VehicleState = () => {
	const [isDriving, setIsDriving] = useState(false);
	const [speed, setSpeed] = useState(0);
	const [location, setLocation] = useState({ lat: 0, lng: 0 });

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
