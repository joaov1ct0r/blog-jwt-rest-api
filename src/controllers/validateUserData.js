import Joi from '@hapi/joi';

let validateUserData = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateUserEdit = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        newemail: Joi.string().required().min(10).max(100),
        newpassword: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateUserDeleted = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100)
    });

    return schema.validate(data);
};

export { validateUserData };
