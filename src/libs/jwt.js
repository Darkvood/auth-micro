const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");

bluebird.promisifyAll(jwt);

const key = process.env.JWT_KEY;

// Create tokens pair
async function generatePair(user) {
  const accessToken = await jwt.signAsync({ id: user.id }, key, {
    expiresIn: "15m"
  });

  const refreshToken = await jwt.signAsync({ id: user.id }, key, {
    expiresIn: "30d"
  });

  const expiresIn = jwt.decode(accessToken).exp;

  return { accessToken, refreshToken, expiresIn };
}

// Get payload from token
async function verify(token) {
  try {
    const { id } = await jwt.verifyAsync(token, key);

    return { id };
  } catch (e) {
    return false;
  }
}

// Get token from Headers.authorization
function getToken(authorization) {
  if (!authorization || !authorization.match(/^Bearer\s/)) {
    return false;
  }

  return authorization.replace(/^Bearer\s/, "");
}

module.exports = {
  generatePair,
  verify,
  getToken
};
