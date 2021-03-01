const jsonwebtoken = require('jsonwebtoken');

function getJwtToken(ctx) {
  if (!ctx.header || !ctx.header.authorization) {
    return;
  }

  const parts = ctx.header.Authorization.split(" ");

  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
  }
  return ctx.throw(401, {
    error: { code: 401, message: "AUTHENTICATION_ERROR" },
  });
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
