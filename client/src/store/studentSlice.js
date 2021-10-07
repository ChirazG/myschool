import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allsubject_mark: [],   //all students one mark of one teacher of one subject
    allsubject_presence: [],  //all students one presence status of one teacher in one subject
    allsubjects: [],
    error: ''
}
const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getMyMarkSuccess: (state, { payload }) => {
            state.allsubject_mark = payload;
            state.error = '';
        },

        getMytMarkFail: (state, { payload }) => {
            state.error = payload;
        },
        getMyPresenceSuccess: (state, { payload }) => {
            state.allsubject_presence = payload;
            state.error = '';
        },
        getMyPresenceFail: (state, { payload }) => {
            state.error = payload;
        },

    },
})

export const { getMyMarkSuccess, getMyMarkFail, getMyPresenceSuccess, getMyPresenceFail } = studentSlice.actions

export default studentSlice.reducer