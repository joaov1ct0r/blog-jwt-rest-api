import Joi from "@hapi/joi";

const validateHandleNewUser = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    password: Joi.string().required().min(8).max(250)
  });

  return schema.validate(data);
};

const validateHandleUserLogin = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    password: Joi.string().required().min(8).max(250)
  });

  return schema.validate(data);
};

const validateHandleUserEdit = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    password: Joi.string().required().min(8).max(250)
  });

  return schema.validate(data);
};

const validateHandleOneUser = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100)
  });

  return schema.validate(data);
};

export {
  validateHandleNewUser,
  validateHandleUserLogin,
  validateHandleUserEdit,
  validateHandleOneUser
};
