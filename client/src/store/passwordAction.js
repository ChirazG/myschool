import {
	otpReqPending,
	otpReqSuccess,
	otpReqFail,
	updatePassSuccess,
} from "./passwordSlice";

import { reqPasswordOtp, updateUserPassword } from "../api/passwordapi";

export const sendPasswordResetOtp = (email, role) => async dispatch => {
	try {
		dispatch(otpReqPending());

		const { status, message } = await reqPasswordOtp(email, role);

		if (status === "success") {
			return dispatch(otpReqSuccess({ message, email }));
		}

		dispatch(otpReqFail(message));
	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};

export const updatePassword = (frmData, role) => async dispatch => {
	try {
		dispatch(otpReqPending());

		const { status, message } = await updateUserPassword(frmData, role);

		if (status === "success") {
			return dispatch(updatePassSuccess(message));
		}

		dispatch(otpReqFail(message));
	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};