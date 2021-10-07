const router = require('express').Router();
const Presence = require('../model/presence/Presence');
const { getPresenceById, getPresenceByStubjectId, getPresenceByStudentId } = require('../model/presence/presenceModel');



//http://localhost:5000/presence


//Get presence router
router.get('/', async (req, res) => {

    const _id = req.presenceId;
    const presenceGet = await getPresenceById(_id)
    res.json({ presence: presenceGet });
});

router.get('/presenceofOneSubject', async (req, res) => {
    try {

        const subjectId = req.query.id;
        const result = await getPresenceByStubjectId(subjectId);
        res.json({ status: "success", message: "list of presence of one subject geted! ", result });

    } catch (error) {
        res.status(407).json({ message: error.message })
        console.log(error);
    }
});

router.get('/presenceofOneStudent', async (req, res) => {
    try {

        const studentId = req.query.id;
        const result = await getPresenceByStudentId(studentId)
        res.json({ status: "success", message: "list of presence of one student geted! ", result });

    } catch (error) {
        res.status(407).json({ message: error.message })
        console.log(error);
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const updatePresence = await Presence.updateOne(
            { _id: req.params.id },
            { attendancy: req.query.attendancy })
        res.json({ status: "success", message: " Presence updated" });

    } catch (error) {
        res.status(408).json({ message: error.message })
        console.log(error);
    }

});

router.post('/addpresence', async (req, res) => {

    const newPresence = new Presence({
        attendancy: req.body.attendancy,
        student: req.body.student,
        subject: req.body.subject
    });

    try {
        await newPresence.save();
        res.json({ status: "success", message: "new Presence created", newPresence });



    } catch (error) {
        res.status(409).json({ message: error.message })

    }
})

module.exports = router;