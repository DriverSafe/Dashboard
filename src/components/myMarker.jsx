import React from "react";

import "./styles/myMarker.css";

const MyMarker = ({ text, tooltip, $hover }) => {
	return (
		<div className="myMarker-container">
			<div className="pin"></div>
			<div className="pulse"></div>
			<div className="my-marker-tooltip">{tooltip}</div>
		</div>
	);
};

export default MyMarker;
