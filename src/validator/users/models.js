const Joi = require('joi');

const RegisterUserPayload = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  gender: Joi.string().required(),
  status: Joi.string().required(),
});

const LoginUserPayload = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const RequestOtpPayload = Joi.object({
  token: Joi.string().required(),
});

const VerifyOtpPayload = Joi.object({
  otp: Joi.number().required(),
  token: Joi.string().required(),
});

const UpdateProfilePayload = Joi.object({
  fullname: Joi.string().required(),
  gender: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = {
  RegisterUserPayload,
  LoginUserPayload,
  RequestOtpPayload,
  VerifyOtpPayload,
  UpdateProfilePayload,
};
