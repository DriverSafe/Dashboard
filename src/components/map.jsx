import React from "react";
import GoogleMapReact from "google-map-react";

import "./styles/map.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
	const defaultProps = {
		center: {
			lat: 7.640970334275281,
			lng: 80.69530538778625,
		},
		zoom: 8,
	};

	return (
		<React.Fragment>
			<div className="map">
				<div className="map-container">
					<GoogleMapReact
						bootstrapURLKeys={{ key: "AIzaSyBctrjc9ZzT2d5EFqBGWgd5d-FBI4sIhg4" }}
						defaultCenter={defaultProps.center}
						defaultZoom={defaultProps.zoom}
					>
						<AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
					</GoogleMapReact>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Map;
