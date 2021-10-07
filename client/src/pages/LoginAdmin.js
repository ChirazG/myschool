import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoginAdminForm from '../components/Admin/LoginAdminForm';


const LoginAdmin = () => {
    const initialState = {
        email: "",
        password: "",
    };

    return (
        <div className="login loginCont">

            <LoginAdminForm />

        </div>
    )
}

export default LoginAdmin