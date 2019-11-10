let activeRefreshTokens = [];

function saveRefreshToken(token) {
  activeRefreshTokens.push(token);
}

function isValidRefreshToken(token) {
  return activeRefreshTokens.find(el => el === token) ? true : false;
}

function replaceRefreshToken(prevToken, nextToken) {
  activeRefreshTokens = activeRefreshTokens.filter(
    token => token !== prevToken
  );

  activeRefreshTokens.push(nextToken);
}

module.exports = { saveRefreshToken, isValidRefreshToken, replaceRefreshToken };
