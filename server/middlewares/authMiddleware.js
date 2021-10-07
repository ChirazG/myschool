const { verifyAccessJWT } = require('../helpers/jwtHelper');
const { getJWT, deleteJWT } = require('../helpers/radisHelper');


const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    //console.log(authorization);

    //1. Verify if jwt is valid

    const decoded = await verifyAccessJWT(authorization);
    //console.log(decoded);    // { email: 'user@gmail.com', iat: 1627387903, exp: 1627388803 }

    //2. check if jwt exist in redis

    if (decoded.email) {
        const userId = await getJWT(authorization);

        if (!userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.userId = userId;
        return next();
    }

    /*deleteJWT(authorization)
    return res.status(403).json({ message: "Forbidden" });*/

};

module.exports = {
    userAuthorization,
};