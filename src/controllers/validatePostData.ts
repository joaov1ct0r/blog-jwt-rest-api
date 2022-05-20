import Joi from "@hapi/joi";

const validateHandleNewPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(5).max(250),
    content: Joi.string().required().min(10).max(250)
  });

  return schema.validate(data);
};

let validateHandleEditPost = data => {
  let schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(5).max(250),
    content: Joi.string().required().min(10).max(250),
    id: Joi.string().required().min(1).max(10)
  });

  return schema.validate(data);
};

let validateHandleDeletePost = data => {
  let schema = Joi.object({
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
