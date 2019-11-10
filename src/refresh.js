const { send } = require("micro");

const { getToken, verify, generatePair } = require("./libs/jwt");
const { isValidRefreshToken, replaceRefreshToken } = require("./libs/storage");

module.exports = async (req, res) => {
  const prevToken = getToken(req.headers.authorization);

  if (!prevToken || !isValidRefreshToken(prevToken)) {
    return send(res, 401);
  }

  const payload = await verify(prevToken);

  if (payload === false) {
    return send(res, 401);
  }

  const nextTokens = await generatePair(payload);

  replaceRefreshToken(prevToken, nextTokens.refreshToken);

  return send(res, 200, nextTokens);
};
