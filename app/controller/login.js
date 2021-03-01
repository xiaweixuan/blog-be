const { createToken } = require('../util/token')

class LoginController {

  async signIn(ctx) {
    const request = ctx.request.body;

    if (!request.username || !request.password) {
      ctx.throw(404, { success: false, errorMessage: "INVALID_DATA" });
    }

    if (request.username !== process.env.ADMIN_USER || request.password !== process.env.ADMIN_PASSWORD) {
      ctx.throw(401, { success: false, errorMessage: "USER_INFORMATION_ERROR" });
    }

    let token = createToken({ username: request.username })
    ctx.set('X-Jwt-Token', token);
    ctx.body = {
      success: true,
      data: {},
    };

  }



  async forgot(ctx) {
  }
}

module.exports = LoginController;