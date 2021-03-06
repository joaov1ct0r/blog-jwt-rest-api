import Joi from "@hapi/joi";

const validateHandleNewPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(5).max(250),
    content: Joi.string().required().min(10).max(250)
  });

  return schema.validate(data);
};

const validateHandleEditPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(5).max(250),
    content: Joi.string().required().min(10).max(250),
    id: Joi.string().required().min(1).max(10)
  });

  return schema.validate(data);
};

const validateHandleDeletePost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    id: Joi.string().required().min(1).max(10)
  });

  return schema.validate(data);
};

const validateHandleOnePost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema = Joi.object({
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
