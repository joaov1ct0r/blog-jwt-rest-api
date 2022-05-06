import Joi from '@hapi/joi';

let validateHandleAdminEditUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        userEmail: Joi.string().required().min(10).max(100),
        userPassword: Joi.string().required().min(8).max(250),
        userNewEmail: Joi.string().required().min(10).max(100),
        userNewPassword: Joi.string().required().min(8).max(250)
    });

    return schema.validate(data);
};

let validateHandleAdminDeleteUser = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        userEmail: Joi.string().required().min(10).max(100)
    });

    return schema.validate(data);
};

let validateHandleAdminDeletePost = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        postId: Joi.string().required().min(1)
    });

    return schema.validate(data);
};

export {
    validateHandleAdminEditUser,
    validateHandleAdminDeleteUser,
    validateHandleAdminDeletePost
};
