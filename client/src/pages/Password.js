import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import PasswordReset from "../components/password/PasswordReset";
import UpdatePassword from "../components/password/UpdatePassword";
import "./Password.css";

//Workflow

// [] Create password reset page
// [] Add request OTP form
// [] Add redux store with Redux-toolkit to handle the network status
// [] sent OTP to email from API (API Already created)
// [] Load form to input OTP and new password
// [] New password must match confirm password, form validation
// [] Connect to API Endpoint (API Already created)
// [] Add reducer through Redux-toolkit to handle the network status and provide the feedback to the user
// [] Send email, OTP and new password to update the password.

const Password = () => {

	const { showUpdatePassForm } = useSelector(state => state.password);

	return (
		<div className="entry-page">
			<Jumbotron className="form-box">
				{showUpdatePassForm ? <UpdatePassword role={localStorage.getItem("role")} /> : <PasswordReset role={localStorage.getItem("role")} />}
				<div className="text-center">
					<a href="/login">Login Now</a>
				</div>
			</Jumbotron>
		</div>
	);
};

export default Password