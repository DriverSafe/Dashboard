import React from "react";

import "./App.css";
import Map from "./components/map";
import VehicleState from "./components/vehicleState";

function App() {
	return (
		<React.Fragment>
			<div className="App">
				<nav className="navbar navbar-dark bg-dark">
					<a className="navbar-brand" href="#">
						<img className="logo" src="/static/images/logo.png" width="165" height="15" />
					</a>
				</nav>

				<div className="App-container">
					<div className="App-container-left">
						<div className="left-container">
							<VehicleState />
						</div>
					</div>
					<div className="App-container-right">
						<div className="right-container">
							<div className="map-container">
								<Map />
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
