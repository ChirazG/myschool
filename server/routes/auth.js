const router = require('express').Router();
const Student = require('../model/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const { userAuthorization } = require('../middlewares/authMiddleware');
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwtHelper');
const { insertStudent, getStudentByEmail, getStudentById, updatePassword, storeStudentRefreshJWT, getAllStudents, deleteStudent } = require('../model/studentModel');
const { setPasswordResetPin, getPinByEmailPin, deletePin } = require('../model/resetPin/resetPinModel');
const { emailProcesser } = require('../helpers/emailHelper');
const { hashPassword } = require('../helpers/bcryptHelper');
const { resetPassReqValidation, updatePassValidation } = require('../middlewares/formValidationMiddleware');
const { deleteJWT } = require('../helpers/radisHelper');

//http://localhost:5000/student

router.all('/', (req, res, next) => {
    // res.json({message: "return from user router"});
    next()
})

//get all student
router.get('/allstudent', async (req, res) => {
    const allStudent = await getAllStudents();
    try {
        return res.json(allStudent);
    } catch (error) {
        console.log(error);
    }
})
//Get student profile router
router.get('/', userAuthorization, async (req, res) => {

    //this data coming from database
    const _id = req.userId;   //based on userId we're going to get the user profile

    //3. extract user id
    const studentProf = await getStudentById(_id)
    //4. get user profile based on the user id

    res.json({
        firstName: studentProf.firstName,
        lastName: studentProf.lastName,
        gender: studentProf.gender,
        birthday: studentProf.birthday,
        livewith: studentProf.livewith,
        lastyear: studentProf.lastyear,
        phone: studentProf.phone,
        adresse: studentProf.adresse,
        email: studentProf.email,
        _id: studentProf._id
    });
});

router.get('/studentprofile', async (req, res) => {

    const id = req.query.id;
    //3. extract user id
    const studentProf = await getStudentById(id);
    //4. get user profile based on the user id

    res.json({
        firstName: studentProf.firstName,
        lastName: studentProf.lastName,
        gender: studentProf.gender,
        birthday: studentProf.birthday,
        livewith: studentProf.livewith,
        lastyear: studentProf.lastyear,
        phone: studentProf.phone,
        adresse: studentProf.adresse,
        email: studentProf.email,
        _id: studentProf._id
    });

});

router.post('/register', async (req, res) => {

    //Let's validate the data before we make a student
    const { error } = registerValidation(req.body);
    if (error) return res.json({ status: "error", message: error.details[0].message });

    //Checking if the student is already in the database
    const emailExist = await Student.findOne({ email: req.body.email });
    if (emailExist) return res.json({ status: "error", message: 'Email already exists' });

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new student
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthday: req.body.birthday,
        livewith: req.body.livewith,
        lastyear: req.body.lastyear,
        phone: req.body.phone,
        adresse: req.body.adresse,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedStudent = await student.save();
        res.json({ status: "success", message: "new user created", student: student._id });
        //res.send('registred!')


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
    //Let's validate the data before we make a student
    const { error } = loginValidation(req.body);
    console.log(error)
    if (error) return res.json({ status: "error", message: error.details[0].message });

    //Checking if the email exists
    const student = await Student.findOne({ email: req.body.email });
    if (!student) res.json({ status: "error", message: "email wrong!" });

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, student.password);
    if (!validPass) res.json({ status: "error", message: "password is wrong" });

    //Create and assign a token
    const accessJWT = await createAccessJWT(student.email, `${student._id}`);
    const refreshJWT = await createRefreshJWT(student.email, `${student._id}`)
    res.json({
        status: "success",
        message: "Logged in!",
        accessJWT,
        refreshJWT
    })

});

// A. Create and send password reset pin number 
router.post('/reset-password', resetPassReqValidation, async (req, res) => {
    //A.1. receive email 
    const { email } = req.body;

    //A.2. check if the user exist for the email
    const student = await getStudentByEmail(email)
    if (student && student._id) {
        //A.3. create uniq 6 digit pin
        const setPin = await setPasswordResetPin(email);
        await emailProcesser({ email, pin: setPin.pin, type: "request-new-password" });

        //A.5. email the pin
        return res.json({
            status: "success",
            message: "If the email exist in the database, the password, the password reset will br sent shortly."
        });
    }
    res.json({
        status: "error",
        message: "If the email exist in the database, the password, the password reset will br sent shortly."
    });

})

//B. Update passwod in DB
router.patch('/reset-password', updatePassValidation, async (req, res) => {
    //B.1. receive email, pin and password
    const { email, pin, newPassword } = req.body;

    const getPin = await getPinByEmailPin(email, pin);
    //B.2. validate pin
    if (getPin._id) {
        const dbDate = getPin.addedAt;
        const expiresIn = 1;
        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
        const today = new Date();

        if (today > expDate) {
            return res.json({ status: "error", message: "invalid or expired pin!" })
        }

        //B.3. encrypt new password
        const hashedPass = await hashPassword(newPassword);

        const student = await updatePassword(email, hashedPass);
        //B.4. update password in db
        if (student._id) {

            //B.5. send email notification
            await emailProcesser({ email, type: "password-update-success" });

            //B.6 delete pin from db
            deletePin(email, pin);

            return res.json({ status: "success", message: "your password has been updated" });
        }
    }
    res.json({ status: "error", message: "Unable to update your password. please try again!" });
});

//Student logout and invalidate jwts
//1. get the jwt and verify    
router.delete('/logout', userAuthorization, async (req, res) => {
    const { authorization } = req.headers;
    //this data coming form database
    const _id = req.userId;

    // 2. delete accessJWT from redis database
    deleteJWT(authorization);

    // 3. delete refreshJWT from mongodb
    const result = await storeStudentRefreshJWT(_id, "");

    if (result._id) {
        return res.json({ status: "success", message: "Loged out successfully" });
    }

    res.json({ status: "error", message: "Unable to log you out, please try later!" });
});

router.patch('/update/:id', async (req, res) => {
    try {
        const updateStudent = await Student.updateOne(
            { _id: req.params.id },
            {
                phone: req.body.phone,
                adresse: req.body.adresse,
                email: req.body.email
            })

        res.json({ status: "success", message: " Student updated" });

    } catch (error) {
        res.status(408).json({ message: error.message })

    }

});

// router.delete('/deletestudent/:id', async (req, res) => {
//     const _id = req.params.id;
//     console.log("req.body._id", _id)
//     try {
//         await deleteStudent(_id);
//         return res.json({ status: "success", message: "Deleted successfully" });

//     } catch (error) {
//         res.json({ status: "error", message: "Unable to delete!" });
//         console.log(error)
//     }   
// });

// router.delete('/:id',authmiddelware, (req,res)=>{
//     project.findByIdAndDelete({_id:req.params.id}) 
//     .then((data)=>res.status(200).json(data)) 
//     .catch((err)=>res.status(400).json({errors:[{msg:"error to delete project"}]}))
//   })

module.exports = router;



