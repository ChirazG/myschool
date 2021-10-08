import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./loginSlice";
import registerReducer from './registerSlice';
import userReducer from './userSlice';
import teacherReducer from './teacherSlice';
import studentReducer from './studentSlice';
import passwordReducer from './passwordSlice';
import adminReducer from './adminSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        admin: adminReducer,
        teacher: teacherReducer,
        student: studentReducer,
        password: passwordReducer
    },
})