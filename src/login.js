const Joi = require("@hapi/joi");
const { send } = require("micro");
const parse = require("urlencoded-body-parser");

const findUser = require("./libs/findUser");
const { generatePair } = require("./libs/jwt");
const { saveRefreshToken } = require("./libs/storage");

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
  try {
    const body = await parse(req);
    const userData = await loginSchema.validateAsync(body);

    const user = await findUser(userData);

    if (user === false) {
      return send(res, 401, { error: "User does not exist" });
    }

    const tokens = await generatePair(user);

    saveRefreshToken(tokens.refreshToken);

    return send(res, 200, tokens);
  } catch (e) {
    if (e.message) {
      return send(res, 400, { error: e.message });
    }

    return send(res, 400, { error: e });
  }
};
