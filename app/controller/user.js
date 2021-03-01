const { User } = require('../models');

class UserController {

  async get(ctx) {
    try {
      const result = await User.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async update(ctx) {
    try {
      const { autograph, email, qq, weixin, custom_fields } = ctx.request.body;
      const user = await User.findByPk(1);
      user.autograph = autograph;
      user.email = email;
      user.qq = qq;
      user.weixin = weixin;
      user.custom_fields = custom_fields;
      await user.save();
      ctx.body = { success: true, data: user };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }
}

module.exports = UserController;
