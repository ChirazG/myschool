const Mark = require('./Mark');

const getMarkById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Mark.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
                .populate({ path: 'student', model: 'Student', select: 'firstName lastName' })
                .populate({ path: 'subject', model: 'Subject', select: 'title' })
        } catch (error) {
            reject(error)
        }


    });
};

const getMarkByStudentId = (studentId) => {

    return new Promise((resolve, reject) => {

        try {
            Mark.find({ student: studentId }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            }).populate({ path: 'subject', model: 'Subject', select: 'title' })
        } catch (error) {
            reject(error)
        }
    });
};

const getMarkByStubjectId = (subjectId) => {

    return new Promise((resolve, reject) => {
        try {
            Mark.find({ subject: subjectId }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            }).populate({ path: 'student', model: 'Student', select: 'firstName lastName' })
        } catch (error) {
            reject(error)
        }
    });
};


const createMark = async (req, res) => {
    const newMark = new Mark({
        attendance: req.body.attendance,
        student: req.body.student,
        subject: req.body.subject
    });

    try {
        await newMark.save();

        res.status(201).send(newMark);

    } catch (error) {
        res.status(409).json({ message: error.message })

    }
};


const updateMark = (student, newMark) => {
    return new Promise((resolve, reject) => {
        try {
            Mark.findOneAndUpdate(
                { student },
                {
                    $set: {
                        "mark": newMark
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
};

module.exports = {
    getMarkById,
    getMarkByStubjectId,
    getMarkByStudentId,
    createMark,
    updateMark,
};