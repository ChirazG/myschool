const router = require('express').Router();
const Subject = require('../model/subject/Subject');
const { getSubjectById, getSubjectByTeacherId } = require('../model/subject/subjectModel');



//http://localhost:5000/subject


//Get subject router
router.get('/', async (req, res) => {

    const _id = req.subjectId;
    const subjectGet = await getSubjectById(_id);
    res.json({ subject: subjectGet });
});

router.get('/subjectteacher', async (req, res) => {

    try {
        const teacherId = req.query.id
        const result = await getSubjectByTeacherId(teacherId)
        res.json({ status: "success", message: "subject geted! ", result });

    } catch (error) {
        res.status(407).json({ message: error.message })
        console.log(error);
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const updateSubject = await Subject.updateOne({ _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    teacher: req.body.teacher
                }
            })
        res.json(updateSubject);

    } catch (error) {
        res.status(408).json({ message: error.message })

    }

});

router.post('/addsubject', async (req, res) => {

    //Checking if the subject is already in the database
    const subjectExist = await Subject.findOne({ title: req.body.title });
    if (subjectExist) return res.json({ status: "error", message: 'subject already exists' });

    const newSubject = new Subject({
        title: req.body.title,
        teacher: req.body.teacher,
    });

    try {
        await newSubject.save();
        res.json({ status: "success", message: "new subject created", newSubject });

    } catch (error) {
        res.status(409).json({ message: error.message })

    }
})

module.exports = router;