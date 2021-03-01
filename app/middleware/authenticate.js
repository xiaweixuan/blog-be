const { getJwtToken, verifyToken } = require('../util/token');

const authenticateToken = (opts = {}) => {
  const { secret } = opts;

  return (ctx, next) => {
    if (!secret) ctx.throw(401, "INVALID_SECRET");

    const token = getJwtToken(ctx);

    try {
      const decoded = verifyToken(token, process.env.JWT_SECRET);
      ctx.state.user = decoded.data;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        ctx.throw(401, { error: { code: 401, message: "TOKEN_EXPIRED" } });
      } else {
        ctx.throw(401, {
          error: { code: 401, message: "AUTHENTICATION_ERROR" },
        });
      }
    }

    return next();
  };
};

module.exports = authenticateToken;