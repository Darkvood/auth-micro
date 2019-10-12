const Joi = require("@hapi/joi");

const loginSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(24)
    .alphanum()
    .required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .required()
});

module.exports = async (req, res) => {
  return "Login";
};
