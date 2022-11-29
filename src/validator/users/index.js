const {
  LoginUserPayload, RegisterUserPayload, RequestOtpPayload, VerifyOtpPayload, UpdateProfilePayload,
} = require('./models');
const InvariantError = require('../../exceptions/InvariantError');

const UserValidator = {
  validateUserRegisterModel: (payload) => {
    const validationResult = RegisterUserPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUserLogin: (payload) => {
    const validationResult = LoginUserPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateRequestOtp: (payload) => {
    const validationResult = RequestOtpPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateVerifyOtp: (payload) => {
    const validationResult = VerifyOtpPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUpdateProfileModels: (payload) => {
    const validationResult = UpdateProfilePayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UserValidator;
