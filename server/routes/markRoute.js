const router = require('express').Router();
const Mark = require('../model/mark/Mark');
const { getMarkById, getMarkByStudentId, getMarkByStubjectId } = require('../model/mark/markModel');



//http://localhost:5000/mark


//Get mark router
router.get('/', async (req, res) => {

    //const _id = req.body;
    const markGet = await getMarkById(req.body._id)
    res.json({ mark: markGet });
});

router.get('/markofOneStudent', async (req, res) => {
    try {

        const studentId = req.query.id;
        const result = await getMarkByStudentId(studentId);
        res.json({ status: "success", message: "all Marks of one student geted! ", result });

    } catch (error) {
        res.status(407).json({ message: error.message })
        console.log(error);
    }
});

router.get('/markofOneSubject', async (req, res) => {
    try {

        const subjectId = req.query.id;
        const result = await getMarkByStubjectId(subjectId);
        res.json({ status: "success", message: "all Marks of one subject geted! ", result });

    } catch (error) {
        res.status(407).json({ message: error.message })
        console.log(error);
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const updateMark = await Mark.updateOne(
            { _id: req.params.id },
            { mark: req.query.mark })

        res.json({ status: "success", message: " Mark updated" });

    } catch (error) {
        res.status(408).json({ message: error.message })

    }

});


router.post('/addmark', async (req, res) => {

    const newMark = new Mark({
        mark: req.body.mark,
        student: req.body.student,
        subject: req.body.subject
    });

    try {
        await newMark.save();
        res.json({ status: "success", message: "new Mark created", newMark });



    } catch (error) {
        res.status(409).json({ message: error.message })

    }
})

module.exports = router;