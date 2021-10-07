import axios from 'axios';

const urlsub = "http://localhost:5000/subject";
const urlm = "http://localhost:5000/mark";
const urlp = "http://localhost:5000/presence";


export const fetchAllMarksOfOneStudent = (_id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlm + '/markofOneStudent?id=' + _id);
            resolve(res);

            if (res.data.status === 'success') {
                resolve(res);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
}

export const fetchAllMarksOfAllStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlm, data);
            resolve(res.data);
            if (res.data.status === 'success') {
                resolve(res.data);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
};


export const fetchAllMarksOfOneSubject = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlm + '/markofOneSubject?id=' + _id);
            resolve(res);

        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
};

export const markAdd = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlm + "/addmark", data);
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

export const markUpdate = (id, mark) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(urlm + `/update/${id}?mark=${mark}`);
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

export const addMark = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlm + "/addmark", data);
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

