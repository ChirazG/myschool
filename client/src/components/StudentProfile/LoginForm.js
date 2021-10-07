import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import studentLogin from "../../api/studentapi";
import { Link, useHistory, useLocation } from "react-router-dom";
import { loginFail, loginPending, loginSuccess } from '../../store/loginSlice';
import { Alert, Spinner } from 'react-bootstrap';
import { getStudentProfile } from "../../store/userAction";

const LoginForm = () => {
    const initialDetails = {
        email: "",
        password: ""
    }
    const [details, setDetails] = useState(initialDetails);
    const [role, setRole] = useState("")
    const dispatch = useDispatch();
    const { isLoading, isAuth, error } = useSelector(state => state.login);
    const history = useHistory();
    const location = useLocation()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }
    let { from } = location.state || { from: { pathname: "/login" } };

    useEffect(() => {
        sessionStorage.getItem("accessJWT") && history.replace(from);
    }, [history, isAuth]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!details.email || !details.password) {
            return alert("fill up the form!");
        }
        dispatch(loginPending());

        try {
            const isAuth = await studentLogin(details);

            if (isAuth.status == "error") {
                return dispatch(loginFail(isAuth.message));
            }
            dispatch(loginSuccess());

            dispatch(getStudentProfile()); //here
            history.push("/profile/:{user.id}");
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }

    const handleRole = () => {
        setRole("student")
        localStorage.setItem("role", "student");
    }

    return (
        <div >
            <form className="form box1" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Login Student</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className='form-group'>
                        <label className='label' htmlFor="email"> Email: </label>
                        <input className="input1" type="email" name="email" id="email" onChange={handleChange} value={details.email}></input>
                    </div>
                    <div className='form-group'>
                        <label className='label' htmlFor="password"> Password: </label>
                        <input className="input1" type="password" name="password" id="password" onChange={handleChange} value={details.password}></input>
                    </div>
                    <input className="input1" className='submit' type="submit" value="LOGIN" onClick={handleRole}></input>
                    {isLoading && <Spinner variant="primary" animation="border"></Spinner>}
                    <div><Link to="/password-reset" onClick={handleRole}>Forget password</Link></div>
                </div>
            </form>


        </div>
    )
}

export default LoginForm
