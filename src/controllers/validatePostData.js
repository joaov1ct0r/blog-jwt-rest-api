import Joi from '@hapi/joi';

let validateHandleNewPost = data => {
    let schema = Joi.object({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(250),
        content: Joi.string().required().min(10).max(250)
    });

    return schema.validate(data);
};

let validateHandleEditPost = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(250),
        content: Joi.string().required().min(10).max(250),
        id: Joi.string().required().min(1).max(10)
    });

    return schema.validate(data);
};

let validateHandleDeletePost = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250),
        id: Joi.string().required().min(1).max(10)
    });

    return schema.validate(data);
};

let validateHandleOnePost = data => {
    let schema = Joi.object({
        id: Joi.string().required().min(1).max(10)
    });

    return schema.validate(data);
};

export {
    validateHandleNewPost,
    validateHandleEditPost,
    validateHandleDeletePost,
    validateHandleOnePost
};
