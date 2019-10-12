const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");

bluebird.promisifyAll(jwt);

const key = "test_key";

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

async function verify(token) {
  try {
    const { id } = await jwt.verifyAsync(token, key);

    return { id };
  } catch (e) {
    return false;
  }
}

module.exports = {
  generatePair,
  verify
};
