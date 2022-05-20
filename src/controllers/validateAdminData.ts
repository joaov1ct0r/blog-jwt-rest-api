import Joi from "@hapi/joi";

const validateHandleAdminEditUser = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema = Joi.object({
    userEmail: Joi.string().required().min(10).max(100),
    userNewEmail: Joi.string().required().min(10).max(100),
    userNewPassword: Joi.string().required().min(8).max(250)
  });

  return schema.validate(data);
};

let validateHandleAdminDeleteUser = data => {
  let schema = Joi.object({
    userEmail: Joi.string().required().min(10).max(100)
  });

  return schema.validate(data);
};

let validateHandleAdminDeletePost = data => {
  let schema = Joi.object({
    id: Joi.string().required().min(1)
  });

  return schema.validate(data);
};

export {
  validateHandleAdminEditUser,
  validateHandleAdminDeleteUser,
  validateHandleAdminDeletePost
};
