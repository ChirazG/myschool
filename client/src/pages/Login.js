import React, { useState } from 'react';
import LoginForm from '../components/StudentProfile/LoginForm';
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoginTeacherForm from '../components/teacherProfile/LoginTeacherForm';

const Login = () => {
    const initialState = {
        email: "",
        password: "",
    };

    const [student, setStudent] = useState(initialState);
    const history = useHistory();
    const Logout = () => {
        sessionStorage.removeItem("accessJWT");
        history.push("/")
    }


    return (
        <div className="login loginCont">
            {(student.email !== "") ? (
                <div>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm />

            )}
            <LoginTeacherForm />

        </div>
    )
}

export default Login
