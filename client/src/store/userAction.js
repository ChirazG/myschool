import { getUserPending, getUserSuccess, getUserFail, getAllUserFail, getAllTeachert, getAllStudent, updateUserFail, updateUserSuccess } from "./userSlice";
import { fetchAllStudent, fetchStudent } from "../api/studentapi";
import { fetchAllTeacher, fetchTeacher } from "../api/teacherapi";
import { userUpdate } from "../api/userapi";
import { fetchAdmin, fetchStudentAdmin } from "../api/adminapi";

export const getStudentProfile = () => async (dispatch) => {

    try {
        dispatch(getUserPending())
        const result = await fetchStudent();

        if (result && result._id) {
            return dispatch(getUserSuccess(result))
        }

        dispatch(getUserFail("User is not found!"))

    } catch (error) {
        dispatch(getUserFail(error))
        console.log(error)
    }
};

export const getTeacherProfile = () => async (dispatch) => {
    try {
        dispatch(getUserPending())
        const result = await fetchTeacher();

        if (result && result._id) {
            return dispatch(getUserSuccess(result))
        }

        dispatch(getUserFail("Teacher is not found!"))

    } catch (error) {
        dispatch(getUserFail(error));
    }
};

export const getAdminProfile = () => async (dispatch) => {
    try {
        dispatch(getUserPending())
        const result = await fetchAdmin();

        if (result && result._id) {
            return dispatch(getUserSuccess(result))
        }

        dispatch(getUserFail("Admin is not found!"))

    } catch (error) {
        dispatch(getUserFail(error));
    }
};

export const getStudentAdminProfile = (_id) => async (dispatch) => {

    try {
        dispatch(getUserPending())
        const result = await fetchStudentAdmin(_id);
        // console.log("rrr", result)

        if (result && result._id) {
            return dispatch(getUserSuccess(result))
        }

        dispatch(getUserFail("User is not found!"))

    } catch (error) {
        dispatch(getUserFail(error))
        console.log(error)
    }
};

export const getAllStudents = () => async (dispatch) => {
    try {
        const result = await fetchAllStudent();
        if (result.data) {
            return dispatch(getAllStudent(result.data))
        }
    } catch (error) {
        dispatch(getAllUserFail(error));
    }
};

export const getAllTeachers = () => async (dispatch) => {
    try {
        const result = await fetchAllTeacher();
        if (result.data) {
            return dispatch(getAllTeachert(result.data))
        }
    } catch (error) {
        dispatch(getAllUserFail(error));
    }
}

export const updateUser = (id, info, role) => async (dispatch) => {

    try {
        const newInfo = await userUpdate(id, info, role);

        if (newInfo) {
            dispatch(updateUserSuccess(newInfo));
            role == "student" ? dispatch(getStudentProfile()) : dispatch(getTeacherProfile());
        }

        dispatch(updateUserFail("couldn't update User!"))

    } catch (error) {
        dispatch(updateUserFail(error))
    }

}

export const seeStudentProfile = (id) => async (dispatch) => {
    try {
        dispatch(getUserPending())
        //call the api
        const result = await fetchStudent();
        if (result && result._id) {
            return dispatch(getUserSuccess(result))
        }

        dispatch(getUserFail("Student is not found!"))

    } catch (error) {
        dispatch(getUserFail(error))
        console.log(error)
    }
};