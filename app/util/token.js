const jsonwebtoken = require('jsonwebtoken');

function getJwtToken(ctx) {
  if (!ctx.header || !ctx.header['x-jwt-token']) {
    return ;
  }
  return ctx.header['x-jwt-token']
}

function createToken(userinfo) {
  const token = jsonwebtoken.sign({
    user: userinfo.username,
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXP });
  return token;
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}

module.exports = { getJwtToken, createToken, verifyToken }
