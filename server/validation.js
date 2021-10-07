//Validation
const Joi = require('joi');

//Register Admin validation
const registerAdminValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    
    });
  
    return schema.validate(data);
};

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
        livewith: Joi.string().required(),
        lastyear: Joi.string().required(),
        phone: Joi.number().required(),
        adresse: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    
    });
  
    return schema.validate(data);
};

//Register teacher validation
const registerTeacherValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        CIN: Joi.string().required(),
        subject: Joi.string().required(),
        phone: Joi.number().required(),
        adresse: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    
    });
    
    return schema.validate(data);
    
};

//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    
    });
    //console.log("hhhh")
    return schema.validate(data);
};

module.exports.registerAdminValidation = registerAdminValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerTeacherValidation  = registerTeacherValidation ;

