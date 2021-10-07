const Joi = require('joi');

const email = Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
});
const pin = Joi.string().required();
const newPassword = Joi.string().min(3).max(30).required();

const resetPassReqValidation = (req, res, next) => {
    const schema = Joi.object({ email });

    const value = schema.validate(req.body);
    if (value.error) {
        return res.json({ status: "error", message: value.error.message });
    }
    next();
};

//C. Serever side form validation
//1. create middleware to validate form data
const updatePassValidation = (req, res, next) => {
    const schema = Joi.object({ email, pin, newPassword });

    const value = schema.validate(req.body);
    if (value.error) {
        return res.json({ status: "error", message: value.error.message });
    }
    next();
};


module.exports = {
    resetPassReqValidation,
    updatePassValidation,
};