import { updateMarkSuccess, updateMarkFail, getStudentsMarkSuccess, getStudentMarkFail, getStudentsPresenceSuccess, getStudentPresenceFail, updatePresenceFail, updatePresenceSuccess, addMarkFail, addMarkSuccess, getSubjectSuccess, getSubjectFail, addPresenceSuccess, addPresenceFail } from './teacherSlice';
import { addMark, fetchAllMarksOfOneSubject, markUpdate } from '../api/markapi';
import { fetchSubjectByTeacherId } from '../api/subjectapi';
import { addPresence, fetchAllPresenceOfOneSubject, presenceUpdate } from '../api/presenceapi';

export const getStudentMark = (teacherId) => async (dispatch) => {

    try {
        const subject = await fetchSubjectByTeacherId(teacherId);

        if (subject.data.result[0]._id) {
            const result = await fetchAllMarksOfOneSubject(subject.data.result[0]._id);

            if (result) {
                return dispatch(getStudentsMarkSuccess(result.data))
            }
            dispatch(getStudentMarkFail("Marks are not found!"))
        }

    } catch (error) {
        dispatch(getStudentMarkFail(error))
    }

}

export const getSubject = (teacherId) => async (dispatch) => {
    try {

        const subject = await fetchSubjectByTeacherId(teacherId);
        //console.log(subject.data.result[0]._id);

        if (subject.data.result[0]._id) {
            const result = subject.data.result[0]._id;
            if (result) {
                return dispatch(getSubjectSuccess(result))
            }
            dispatch(getSubjectFail("Subject not found!"))
        }

    } catch (error) {
        dispatch(getSubjectFail(error))
    }

}

export const updateStudentMark = (id, mark, teacherId) => async (dispatch) => {
    try {
        const newmark = await markUpdate(id, mark);
        if (newmark) {
            dispatch(updateMarkSuccess(newmark));
            dispatch(getStudentMark(teacherId));
        }

        dispatch(updateMarkFail("couldn't update mark!"))

    } catch (error) {
        dispatch(updateMarkFail(error))
    }

}

export const getStudentPresence = (teacherId) => async (dispatch) => {

    try {
        const subject = await fetchSubjectByTeacherId(teacherId);

        if (subject.data.result[0]._id) {
            const result = await fetchAllPresenceOfOneSubject(subject.data.result[0]._id);
            if (result) {
                return dispatch(getStudentsPresenceSuccess(result.data))
            }
            dispatch(getStudentPresenceFail("Presence are not found!"))
        }

    } catch (error) {
        dispatch(getStudentPresenceFail(error))
    }

}

export const updateStudentPresence = (id, attendancy, teacherId) => async (dispatch) => {
    try {
        const newattendancy = await presenceUpdate(id, attendancy);
        if (newattendancy) {
            dispatch(updatePresenceSuccess(newattendancy));
            dispatch(getStudentPresence(teacherId));
        }

        dispatch(updatePresenceFail("couldn't update attendancy!"))

    } catch (error) {
        dispatch(updatePresenceFail(error))
    }

}

export const addStudentMark = (data, teacherId) => async (dispatch) => {

    try {
        const newMark = await addMark(data);
        if (newMark) {
            dispatch(addMarkSuccess(newMark));
        }

        else dispatch(addMarkFail("couldn't add mark!"))

    } catch (error) {
        dispatch(addMarkFail(error))
    }

}

export const addStudentPresence = (data) => async (dispatch) => {

    try {
        const newPresence = await addPresence(data);
        if (newPresence) {
            dispatch(addPresenceSuccess(newPresence));
            //dispatch(getStudentPresence(teacherId));
        }

        else dispatch(addPresenceFail("couldn't add Presence!"))

    } catch (error) {
        dispatch(addPresenceFail(error))
    }

}