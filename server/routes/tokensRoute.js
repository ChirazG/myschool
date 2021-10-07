const express = require('express');
const router = require('express').Router();

const { verifyRefreshJWT, createAccessJWT } = require('../helpers/jwtHelper');
const { getStudentByEmail } = require('../model/studentModel');
const { getTeacherByEmail } = require('../model/teacher/teacherModel');


//http://localhost:5000/tokens


// return jwt
router.get('/', async (req, res, next) => {
    const { authorization } = req.headers;
    //To do
    //1. make sure the token is valid

    const decoded = await verifyRefreshJWT(authorization)
    if (decoded.email) {
        //2. check if the jwt exist in the database 
        const studentProf = await getStudentByEmail(decoded.email);
        if (studentProf._id) {
            let tokenExp = studentProf.refreshJWT.addedAt; //expire date
            const dbRefreshToken = studentProf.refreshJWT.token;

            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)
            //console.log(new Date(tokenExp));

            //3.  check if it's not expired
            const today = new Date()
            if (dbRefreshToken !== authorization && tokenExp < today) {
                //expired
                return res.status(403).json({ message: "Forbidden" });
            }
            
            const accessJWT = await createAccessJWT(decoded.email, studentProf._id.toString());
            // delete old token from redis db

            return res.json({ status: "success", accessJWT });
        }
    }

    res.status(403).json({ message: "Forbidden" });
});

router.get('/tchr', async (req, res, next) => {
    const { authorization } = req.headers;

    //To do
    //1. make sure the token is valid

    const decoded = await verifyRefreshJWT(authorization)
    if (decoded.email) {
        //2. check if the jwt exist in the database 
        const teacherProf = await getTeacherByEmail(decoded.email);
        if (teacherProf._id) {
            let tokenExp = teacherProf.refreshJWT.addedAt; //expire date
            const dbRefreshToken = teacherProf.refreshJWT.token;

            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)
            //console.log(new Date(tokenExp));

            //3.  check if it's not expired
            const today = new Date()
            if (dbRefreshToken !== authorization && tokenExp < today) {
                //expired
                return res.status(403).json({ message: "Forbidden" });
            }
            
            const accessJWT = await createAccessJWT(decoded.email, teacherProf._id.toString());
            
            // delete old token from redis db

            return res.json({ status: "success", accessJWT });
        }
    }

    res.status(403).json({ message: "Forbidden" });
});


module.exports = router;
//Note!
// UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client at ServerResponse.setHeader
// khater ne9ssa return

//Error: node_redis: The SET command contains a invalid argument type. Only strings, dates and buffers are accepted. Please update your code to use valid argument types
// khater ne9sa toString fi id psq c un objet