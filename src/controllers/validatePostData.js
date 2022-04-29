import Joi from '@hapi/joi';

let validatePostData = data => {
    let schema = Joi.object({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(5).max(250)
    });

    return schema.validate(data);
};
