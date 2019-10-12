const jwt = require("jsonwebtoken");

const key = "test_key";

async function generatePair(user) {
  const accessToken = jwt.sign({ id: user.id }, key, {
    expiresIn: "15m"
  });
  const refreshToken = jwt.sign({ id: user.id }, key, {
    expiresIn: "30d"
  });
  const expiresIn = jwt.decode(accessToken).exp;

  return { accessToken, refreshToken, expiresIn };
}

async function verify() {}

module.exports = {
  generatePair,
  verify
};
