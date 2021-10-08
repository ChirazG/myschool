import axios from 'axios';

const urlsub = "http://localhost:5000/subject";

export const fetchSubjectByTeacherId = (_id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlsub + '/subjectteacher?id=' + _id);
            resolve(res);

        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
};

export const subjectAdd = (data) => {
    console.log("subdata", data)
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlsub + "/addsubject", data);
            console.log("sub", res)
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