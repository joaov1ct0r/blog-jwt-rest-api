import Joi from '@hapi/joi';

let validateHandleNewUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateHandleUserLogin = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateHandleUserEdit = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        newEmail: Joi.string().required().min(10).max(100),
        newPassword: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateHandleDeleteUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100)
    });

    return schema.validate(data);
};

let validateHandleOneUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100)
    });
};

export {
    validateHandleNewUser,
    validateHandleUserLogin,
    validateHandleUserEdit,
    validateHandleDeleteUser
};
