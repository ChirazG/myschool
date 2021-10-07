import axios from "axios";

const url = "http://localhost:5000/";

export const reqPasswordOtp = (email, role) => {
	let r = Object.values(role).join('');
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.post(url + r + '/reset-password', { email });
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const updateUserPassword = (passObj, role) => {
	//console.log(...Object.values(role))
	let r = Object.values(role).join('');
	//console.log(r)
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.patch(url + r + "/reset-password", passObj);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};