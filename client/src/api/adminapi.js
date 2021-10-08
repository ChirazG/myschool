import axios from 'axios';


const urla = "http://localhost:5000/admin";
const urls = "http://localhost:5000/student";

export const fetchAdmin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessJWT = sessionStorage.getItem('accessJWT');

            if (!accessJWT) {
                reject("Token not found!")
            }
            const res = await axios.get(urla, {
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

export const fetchStudentAdmin = (_id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urls + '/studentprofile?id=' + _id);
            resolve(res.data);
        } catch (error) {
            console.log(error);
            reject(error.message);
        }

    })
};

// export const deleteStudent = (id) => {
//     console.log("id", id)
//     return new Promise(async (resolve, reject) => { 
//         try {
//             const res = await axios.delete(urls + `/deletestudent/${id}`);
//             console.log("idressss",res);
//             resolve(res.data);

//             if (res.data.status === 'success') {
//                 resolve(res.data);
//                 console.log("ressss",res.data); 
//             }
//         } catch (error) {
//             console.log(error.message);
//             reject(error);
//         }

//     })
// }

const adminLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urla + "/login", data);
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
export default adminLogin;



