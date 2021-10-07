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