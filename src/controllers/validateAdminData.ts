import Joi from "@hapi/joi";

const validateHandleAdminEditUser = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    userEmail: Joi.string().required().min(10).max(100),
    userNewEmail: Joi.string().required().min(10).max(100),
    userNewPassword: Joi.string().required().min(8).max(250)
  });

  return schema.validate(data);
};

const validateHandleAdminDeleteUser = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    userEmail: Joi.string().required().min(10).max(100)
  });

  return schema.validate(data);
};

const validateHandleAdminDeletePost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    id: Joi.string().required().min(1)
  });

  return schema.validate(data);
};

export {
  validateHandleAdminEditUser,
  validateHandleAdminDeleteUser,
  validateHandleAdminDeletePost
};
