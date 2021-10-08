const Student = require('./Student');



const insertStudent = (stdObj) => {
    return new Promise((resolve, reject) => {
        Student(stdObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
};

const getAllStudents = () => {

    return new Promise((resolve, reject) => {

        try {
            Student.find((error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve(data)
            }).populate({ path: 'mark', model: 'Mark', select: 'mark' })

        } catch (error) {
            console.log(error)
            reject(error)
        }

    });
};

const getStudentByEmail = (email) => {

    return new Promise((resolve, reject) => {
        if (!email) return false

        try {
            Student.findOne({ email }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }


    });
};

const getStudentById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Student.findOne({ _id }, (error, data) => {
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
}

const storeStudentRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            Student.findOneAndUpdate(
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
};

const updatePassword = (email, newHashedPass) => {
    return new Promise((resolve, reject) => {
        try {
            Student.findOneAndUpdate(
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

// const deleteStudent = (sId) => {
//     console.log("sId", sId)
//     try {
//         Student.findOneAndDelete({ sId }, (error, data) => {
//             if (error) {
//                 console.log(error);
//             }
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = {
    insertStudent,
    getAllStudents,
    getStudentByEmail,
    getStudentById,
    storeStudentRefreshJWT,
    updatePassword,
    // deleteStudent,
};