const router = require('express').Router();
const Teacher = require('../model/teacher/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerTeacherValidation, loginValidation } = require('../validation');
const { userAuthorization } = require('../middlewares/authMiddleware');
const { createAccessJWT, createRefreshJWT, createRefreshTchrJWT } = require('../helpers/jwtHelper');
const { insertTeacher, getTeacherByEmail, getTeacherById, updatePassword, storeTeacherRefreshJWT, getAllTeachers } = require('../model/teacher/teacherModel');
const { setPasswordResetPin, getPinByEmailPin, deletePin } = require('../model/resetPin/resetPinModel');
const { emailProcesser } = require('../helpers/emailHelper');
const { hashPassword } = require('../helpers/bcryptHelper');
const { resetPassReqValidation, updatePassValidation } = require('../middlewares/formValidationMiddleware');
const { deleteJWT } = require('../helpers/radisHelper');


//http://localhost:5000/teacher


router.all('/', (req, res, next) => {
    // res.json({message: "return from user router"});
    next()
});

//get all teacher
router.get('/allteacher', async (req, res) => {
    const allTeacher = await getAllTeachers();
    try {
        return res.json(allTeacher);
    } catch (error) {
        console.log(error);
    }
});

//Get Teacher profile router
router.get('/', userAuthorization, async (req, res) => {

    const _id = req.userId;
    const teacherProf = await getTeacherById(_id)

    res.json({
        firstName: teacherProf.firstName,
        lastName: teacherProf.lastName,
        CIN: teacherProf.CIN,
        subject: teacherProf.subject,
        phone: teacherProf.phone,
        adresse: teacherProf.adresse,
        email: teacherProf.email,
        _id: teacherProf._id
    });
});

router.post('/register', async (req, res) => {

    //Validate the data before we make a teacher
    const { error } = registerTeacherValidation(req.body);
    if (error) return res.json({ status: "error", message: error.details[0].message });

    //Checking if the teacher is already in the database
    const emailExist = await Teacher.findOne({ email: req.body.email });

    if (emailExist) return res.json({ status: "error", message: 'Email already exists' });

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new teacher
    const teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        CIN: req.body.CIN,
        subject: req.body.subject,
        phone: req.body.phone,
        adresse: req.body.adresse,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedTeacher = await teacher.save();
        res.json({ status: "success", message: "new teacher created", teacher: teacher._id });

    } catch (error) {
        console.log(error)
        let message = "Unable to create new user at the moment, Please try again or call the administration!";
        if (error.message.includes("duplicate key error collection")) {
            message = "this email already have an acount"
        }
        res.json({ status: "error", message: error.message })

    };
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate the data before we make a teacher
    const { error } = loginValidation(req.body);
    console.log(error)
    if (error) return res.json({ status: "error", message: error.details[0].message });

    //Checking if the email exists
    const teacher = await Teacher.findOne({ email: req.body.email });
    if (!teacher) res.json({ status: "error", message: "email wrong!" });

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, teacher.password);
    if (!validPass) res.json({ status: "error", message: "password is wrong" });

    //Create and assign a token
    const accessJWT = await createAccessJWT(teacher.email, `${teacher._id}`);
    const refreshJWT = await createRefreshTchrJWT(teacher.email, `${teacher._id}`)
    res.json({
        status: "success",
        message: "Logged in!",
        accessJWT,
        refreshJWT
    })

});

// Create and send password reset pin number 
router.post('/reset-password', resetPassReqValidation, async (req, res) => {

    const { email } = req.body;
    const teacher = await getTeacherByEmail(email)
    if (teacher && teacher._id) {

        const setPin = await setPasswordResetPin(email);
        await emailProcesser({ email, pin: setPin.pin, type: "request-new-password" });

        return res.json({
            status: "success",
            message: "If the email exist in the database, the password, the password reset will br sent shortly."
        });
    }
    res.json({
        status: "error",
        message: "If the email exist in the database, the password, the password reset will br sent shortly."
    });

});

// Update passwod in DB
router.patch('/reset-password', updatePassValidation, async (req, res) => {

    const { email, pin, newPassword } = req.body;
    const getPin = await getPinByEmailPin(email, pin);


    if (getPin._id) {
        const dbDate = getPin.addedAt;
        const expiresIn = 1;
        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
        const today = new Date();

        if (today > expDate) {
            return res.json({ status: "error", message: "invalid or expired pin!" })
        }

        const hashedPass = await hashPassword(newPassword);
        const teacher = await updatePassword(email, hashedPass);


        if (teacher._id) {

            await emailProcesser({ email, type: "password-update-success" });
            deletePin(email, pin);
            return res.json({ status: "success", message: "your password has been updated" });
        }
    }
    res.json({ status: "error", message: "Unable to update your password. please try again!" });
});


router.delete('/logout', userAuthorization, async (req, res) => {

    const { authorization } = req.headers;
    const _id = req.userId;
    deleteJWT(authorization);
    const result = await storeTeacherRefreshJWT(_id, "");

    if (result._id) {
        return res.json({ status: "success", message: "Loged out successfully" });
    }
    res.json({ status: "error", message: "Unable to log you out, please try later!" });
});

router.patch('/update/:id', async (req, res) => {
    try {
        const updateTeacher = await Teacher.updateOne(
            { _id: req.params.id },
            {
                phone: req.body.phone,
                adresse: req.body.adresse,
                email: req.body.email
            })

        res.json({ status: "success", message: " Teacher updated" });

    } catch (error) {
        res.status(408).json({ message: error.message })

    }

});


module.exports = router;
