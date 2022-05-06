import Joi from '@hapi/joi';

let validateAdminEditUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        userEmail: Joi.string().required().min(10).max(100),
        userPassword: Joi.string().required().min(8).max(250)
    });
};
