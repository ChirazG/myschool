const jwt = require('jsonwebtoken');
const { setJWT, getJWT } = require('./radisHelper');
const { storeStudentRefreshJWT } = require('../model/studentModel');
const { storeTeacherRefreshJWT } = require('../model/teacher/teacherModel');


const createAccessJWT = async (email, _id) => {
    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m",
        });

        await setJWT(accessJWT, _id);

        return Promise.resolve(accessJWT, _id);
    } catch (error) {
        return Promise.reject(error);
    }
}

const createRefreshJWT = async (email, _id) => {
    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        })

        await storeStudentRefreshJWT(_id, refreshJWT);

        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createRefreshTchrJWT = async (email, _id) => {
    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        })

        await storeTeacherRefreshJWT(_id, refreshJWT);

        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error);
    }
};

const verifyAccessJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET))
    } catch (error) {
        return Promise.resolve(error)
    }
}

const verifyRefreshJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET))
    } catch (error) {
        return Promise.resolve(error)
    }
}

module.exports = {
    createRefreshJWT,
    createRefreshTchrJWT,

    createAccessJWT,
    verifyAccessJWT,
    verifyRefreshJWT
}