import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { fetchNewStudentAccessJWT, fetchNewTeacherAccessJWT, fetchNewAdminAccessJWT } from "../api/userapi";
import { loginSuccess } from "../store/loginSlice";
import { getStudentPresence } from "../store/teacherAction";
import { getAdminProfile, getStudentProfile, getTeacherProfile } from "../store/userAction";

export const PrivateRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.login);
    const { user } = useSelector((state) => state.user);
    const role = localStorage.getItem("role")

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = "";

            role == "teacher" ? result = await fetchNewTeacherAccessJWT()
                : role == "student" ? result = await fetchNewStudentAccessJWT()
                    : result = await fetchNewAdminAccessJWT();
            //console.log('rrrrrr', result)
            result && dispatch(loginSuccess());
        };

        role == "teacher" ? !user._id && dispatch(getTeacherProfile(), getStudentPresence(user._id))
            : role == "student" ? !user._id && dispatch(getStudentProfile())
                : !user._id && dispatch(getAdminProfile());
        //console.log('pffff',role)
        !sessionStorage.getItem("accessJWT") &&
            localStorage.getItem("refreshJWT") &&
            updateAccessJWT();
        !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    }, [dispatch, isAuth, user._id]);

    return (
        <Route
            {...rest}
            render={({ location }) =>

                isAuth ? (
                    <div>{children}</div>
                )
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
            }
        />
    );
};