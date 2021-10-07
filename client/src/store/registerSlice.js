import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    status: '',
    message: ""
}
const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerPending: (state) => {
            state.isLoading = true;
        },
        registerSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.status = "success";
            state.message = payload;
        },
        registerFail: (state, { payload }) => {
            state.isLoading = false;
            state.status = "error";
            state.message = payload;
        },
    }
})

export const { registerPending, registerSuccess, registerFail } = registerSlice.actions;
export default registerSlice.reducer;