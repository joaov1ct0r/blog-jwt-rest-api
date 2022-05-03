import Joi from '@hapi/joi';

let validateHandleNewPost = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(250)
    });

    return schema.validate(data);
};

export { validateHandleNewPost };
