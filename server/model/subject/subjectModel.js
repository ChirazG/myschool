const Subject = require('./Subject')


const getSubjectById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Subject.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
                .populate({ path: 'teacher', model: 'Teacher', select: 'firstName lastName' })
        } catch (error) {
            reject(error)
        }
    });
};

const getSubjectByTeacherId = (teacherId) => {

    return new Promise((resolve, reject) => {
        try {
            Subject.find({ teacher: teacherId }, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
    });
};


/*const updateSubject = (_id ) => {
    return new Promise((resolve, reject) => {
        try {
            Subject.findOneAndUpdate(
                {_id},
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
};*/

module.exports = {
    getSubjectById,
    getSubjectByTeacherId,
    //updateSubject,
};