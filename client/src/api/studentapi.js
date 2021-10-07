//Make api calls
import axios from 'axios';

const urlp = "http://localhost:5000/posts";
const urls = "http://localhost:5000/student";


export const fetchPosts = () => axios.get(urlp);
export const createPost = (newPost) => axios.post(urlp, newPost);


export const studentRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urls + "/register", data);
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


const studentLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urls + "/login", data);
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
export default studentLogin;

export const fetchAllStudent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urls + "/allstudent");
            resolve(res);

        } catch (error) {
            console.log(error);
            reject(error.message);
        }

    })
};

export const fetchStudent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessJWT = sessionStorage.getItem('accessJWT');

            if (!accessJWT) {
                reject("Token not found!")
            }
            const res = await axios.get(urls, {
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



export const studentLogout = async () => {
    try {
        await axios.delete(urls + "/logout", {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
    } catch (error) {
        console.log(error);
    }
};
