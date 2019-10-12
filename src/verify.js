const { send } = require("micro");

const { verify } = require("./libs/jwt");

module.exports = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.match(/^Bearer\s/)) {
    return send(res, 401);
  }

  const token = authorization.replace(/^Bearer\s/, "");

  const payload = await verify(token);

  if (payload === false) {
    return send(res, 401);
  }

  return send(res, 200, payload);
};
