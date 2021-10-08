const Teacher = require('./Teacher');


const insertTeacher = (stdObj) => {
    return new Promise((resolve, reject) => {
        Teacher(stdObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
};

const getAllTeachers = () => {

    return new Promise((resolve, reject) => {

        try {
            Teacher.find((error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }

    });
};

const getTeacherByEmail = (email) => {

    return new Promise((resolve, reject) => {
        if (!email) return false

        try {
            Teacher.findOne({ email }, (error, data) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
            console.log(error)
        }


    });
};

const getTeacherById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Teacher.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
            console.log(error)
        }


    });
}

const storeTeacherRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            Teacher.findOneAndUpdate(
                { _id },
                {
                    $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
                },
                { new: true }
            )
                .then((data) => resolve(data))
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

const updatePassword = (email, newHashedPass) => {
    return new Promise((resolve, reject) => {
        try {
            Teacher.findOneAndUpdate(
                { email },
                {
                    $set: {
                        "password": newHashedPass
                    },
                },
                { new: true }
            )
                .then(data => resolve(data))
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        } catch (error) {
            console.log(error)
            reject(error)
        }

    })
}


const deleteTeacher = (tId) => {
    try {
        Teacher.findOneAndDelete({ tId }, (error, data) => {
            if (error) {
                console.log(error);
            }
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    insertTeacher,
    getAllTeachers,
    getTeacherByEmail,
    getTeacherById,
    storeTeacherRefreshJWT,
    updatePassword,
    deleteTeacher,
};