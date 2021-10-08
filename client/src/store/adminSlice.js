import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    teacher: [], 
    subject: [],
    error: ''
}
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        addSubjectSuccess: (state, { payload }) => {
            state.subject = payload;
            state.error = '';
        },
        addSubjectFail: (state, { payload }) => {
            state.error = payload;
        }

    },
})

export const { addSubjectSuccess, addSubjectFail} = adminSlice.actions

export default adminSlice.reducer