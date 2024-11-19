import * as Joi from 'joi';

export const UserSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().lowercase().required(),
  message: Joi.string().required(),
});
