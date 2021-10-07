import axios from 'axios';


const urlt = "http://localhost:5000/teacher";


export const teacherRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlt + "/register", data);
            resolve(res.data);

            if (res.data.status === 'success') {
                resolve(res.data);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
}


const teacherLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlt + "/login", data);
            resolve(res.data);
            if (res.data.status === 'success') {
                sessionStorage.setItem("accessJWT", res.data.accessJWT)
                localStorage.setItem("refreshJWT", JSON.stringify({ refreshJWT: res.data.refreshJWT }))
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
}
export default teacherLogin;

export const fetchAllTeacher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlt + "/allteacher");
            resolve(res);

        } catch (error) {
            console.log(error);
            reject(error.message);
        }

    })
};

export const fetchTeacher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessJWT = sessionStorage.getItem('accessJWT');

            if (!accessJWT) {
                reject("Token not found!")
            }
            const res = await axios.get(urlt, {
                headers: {
                    Authorization: accessJWT
                }
            });
            resolve(res.data);
        } catch (error) {
            console.log(error);
            reject(error.message);
        }

    })
};

export const teacherLogout = async () => {
    try {
        await axios.delete(urlt + "/logout", {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
    } catch (error) {
        console.log(error);
    }
};