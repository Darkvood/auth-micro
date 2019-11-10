const { send } = require("micro");

const { getToken, verify } = require("./libs/jwt");

module.exports = async (req, res) => {
  const token = getToken(req.headers.authorization);

  if (!token) {
    return send(res, 401);
  }

  const payload = await verify(token);

  if (payload === false) {
    return send(res, 401);
  }

  return send(res, 200, payload);
};
