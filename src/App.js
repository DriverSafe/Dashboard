import React from "react";

import "./App.css";
import Map from "./components/map";

function App() {
	return (
		<React.Fragment>
			<div className="App">
				<nav className="navbar navbar-dark bg-dark">
					<a className="navbar-brand" href="#">
						DriverSafe
					</a>
				</nav>

				<div className="App-container">
					<div className="App-container-left">
						<div className="left-container">
							<h1>Right</h1>
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
