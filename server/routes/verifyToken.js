/*const jwt = require('jsonwebtoken');

module.exports =  auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.student = verified;
        next()  
    } catch (err) {
        res.status(400).send('Invalid token')   
    };
};*/