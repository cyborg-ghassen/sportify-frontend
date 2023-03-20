import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alert = ({alerts}) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (

        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p style={{color: "white", fontSize: "16px", margin: "10px"}}>
                {alert.msg}
            </p>
            <div className={"lineh"}></div>

        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.toastReducer,
});

export default connect(mapStateToProps)(Alert);