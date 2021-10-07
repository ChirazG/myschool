const Presence = require('./Presence');

const getPresenceById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Presence.findOne({ _id }, (error, data) => {
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

const getPresenceByStubjectId = (subjectId) => {

    return new Promise((resolve, reject) => {
        try {
            Presence.find({ subject: subjectId }, (error, data) => {
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

const getPresenceByStudentId = (studentId) => {
    return new Promise((resolve, reject) => {
        try {
            Presence.find({ student: studentId }, (error, data) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
                resolve(data)
            }).populate({ path: 'subject', model: 'Subject', select: 'title' })
        } catch (error) {
            reject(error)
            console.log(error)
        }
    });
};

const createPresence = async (req, res) => {
    const newPresence = new Presence({
        attendance: req.body.attendance,
        student: req.body.student,
        subject: req.body.subject
    });

    try {
        await newPresence.save();

        res.status(201).send(newPresence);

    } catch (error) {
        res.status(409).json({ message: error.message })

    }
};


const updatePresence = (student, newAttendance) => {
    return new Promise((resolve, reject) => {
        try {
            Presence.findOneAndUpdate(
                { student },
                {
                    $set: {
                        "attendance": newAttendance
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
    getPresenceById,
    getPresenceByStubjectId,
    getPresenceByStudentId,
    createPresence,
    updatePresence,
};