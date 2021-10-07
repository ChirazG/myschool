import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    allstudent: [],
    allteacher: [],
    isLoading: false,
    error: ''
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = '';
        },
        getUserFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        getAllStudent: (state, { payload }) => {
            state.allstudent = payload;
            state.error = '';
        },
        getAllTeachert: (state, { payload }) => {
            state.allteacher = payload;
            state.error = '';
        },
        getAllUserFail: (state, { payload }) => {
            state.error = payload;
        },
        updateUserSuccess: (state, { payload }) => {
            state.user = payload;
            state.error = '';
        },
        updateUserFail: (state, { payload }) => {
            state.error = payload;
        },

    },
})

export const { updateUserSuccess, updateUserFail, getUserPending, getUserSuccess, getUserFail, getAllStudent, getAllTeachert, getAllUserFail } = userSlice.actions

export default userSlice.reducer