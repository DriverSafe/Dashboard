import React from "react";

import "./styles/popupAlert.css";

const Popup = (props) => {
	const { onClose, title, message, type } = props;

	return (
		<div className="popup-container">
			<div className="popup-content">
				<h2>{title}</h2>
				<p>{message}</p>
				<div className="popup-buttons">
					<button onClick={onClose} className="btn btn-primary">
						Close
					</button>

					<button className="btn btn-danger">
						Call {type === "accident" ? "Ambulance" : "Police"}
					</button>

					{type === "accident" && <button className="btn btn-warning">Call Owner</button>}
				</div>
			</div>
		</div>
	);
};

export default Popup;
