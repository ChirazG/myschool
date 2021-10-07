import axios from 'axios';


const urlp = "http://localhost:5000/presence";

export const fetchAllPresenceOfAllStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlp, data);
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

export const fetchAllPresenceOfOneStudent = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlp + '/presenceofOneStudent?id=' + _id);
            resolve(res.data.result);

            if (res.data.status === 'success') {
                resolve(res.data.result);
                //console.log("reeeeee", res.data.result);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
}

export const fetchAllPresenceOfOneSubject = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(urlp + '/presenceofOneSubject?id=' + _id);
            resolve(res);

        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
};

export const presenceUpdate = (id, attendancy) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(urlp + `/update/${id}?attendancy=${attendancy}`);
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
export const addPresence = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(urlp + "/addpresence", data);
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

