import { fetchAllMarksOfOneStudent } from '../api/markapi';
import { fetchAllPresenceOfOneStudent } from '../api/presenceapi';
import { getMyMarkSuccess, getMyMarkFail, getMyPresenceSuccess, getMyPresenceFail } from './studentSlice'

export const getMyMark = (studentId) => async (dispatch) => {

    try {
        const mark = await fetchAllMarksOfOneStudent(studentId);
        if (mark.data) {

            return dispatch(getMyMarkSuccess(mark.data))
        }
        dispatch(getMyMarkFail("Marks are not found!"))

    } catch (error) {
        dispatch(getMyMarkFail(error))
    }

}

export const getMyPresence = (studentId) => async (dispatch) => {

    try {
        const presence = await fetchAllPresenceOfOneStudent(studentId);
        if (presence) {
            return dispatch(getMyPresenceSuccess(presence))
        }
        dispatch(getMyPresenceFail("Presence are not found!"))

    } catch (error) {
        dispatch(getMyPresenceFail(error))
    }

}
