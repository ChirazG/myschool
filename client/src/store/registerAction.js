import { registerPending, registerSuccess, registerFail } from "./registerSlice";
import { studentRegister } from "../api/studentapi";
import { teacherRegister } from "../api/teacherapi";


export const newStudentRegister = (data) => async (dispatch) => {
    try {
        dispatch(registerPending())
        //api to send data to the server
        const result = await studentRegister(data);
        result.status === "success" ? dispatch(registerSuccess(result.message)) : dispatch(registerFail(result.message));

    } catch (error) {
        dispatch(registerFail(error.message))
    }

};

export const newTeacherRegister = (data) => async (dispatch) => {
    try {
        dispatch(registerPending())
        const result = await teacherRegister(data);
        result.status === "success" ? dispatch(registerSuccess(result.message)) : dispatch(registerFail(result.message));

        //feedback received from the server
        //update redux store

    } catch (error) {
        dispatch(registerFail(error.message))
    }

}

