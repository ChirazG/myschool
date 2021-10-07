import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //user: {},
    allstudent_mark: [],   //all students one mark of one teacher of one subject
    allstudent_presence: [],  //all students one presence status of one teacher in one subject
    subjects: [],
    error: ''
}
const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        getStudentsMarkSuccess: (state, { payload }) => {
            state.allstudent_mark = payload;
            state.error = '';
        },

        getStudentMarkFail: (state, { payload }) => {
            state.error = payload;
        },
        updateMarkSuccess: (state, { payload }) => {
            state.allstudent_mark = payload;
            state.error = '';
        },

        updateMarkFail: (state, { payload }) => {
            state.error = payload;
        },
        addMarkSuccess: (state, { payload }) => {
            state.allstudent_mark = payload;
            state.error = '';
        },
        addMarkFail: (state, { payload }) => {
            state.error = payload;
        },
        getStudentsPresenceSuccess: (state, { payload }) => {
            state.allstudent_presence = payload;
            state.error = '';
        },
        getStudentPresenceFail: (state, { payload }) => {
            state.error = payload;
        },
        updatePresenceSuccess: (state, { payload }) => {
            state.allstudent_presence = payload;
            state.error = '';
        },
        updatePresenceFail: (state, { payload }) => {
            state.error = payload;
        },
        getSubjectSuccess: (state, { payload }) => {
            state.subjects = payload;
            state.error = '';
        },
        getSubjectFail: (state, { payload }) => {
            state.error = payload;
        },
        addPresenceSuccess: (state, { payload }) => {
            state.allstudent_presence = payload;
            state.error = '';
        },
        addPresenceFail: (state, { payload }) => {
            state.error = payload;
        },
    },
})

export const { addPresenceSuccess, addPresenceFail, getSubjectSuccess, getSubjectFail, addMarkSuccess, addMarkFail, updatePresenceSuccess, updatePresenceFail, updateMarkSuccess, updateMarkFail, getStudentsMarkSuccess, getStudentMarkFail, getStudentsPresenceSuccess, getStudentPresenceFail } = teacherSlice.actions

export default teacherSlice.reducer