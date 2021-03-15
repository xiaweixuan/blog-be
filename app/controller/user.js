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
      const { name, autograph, email, qq, weixin, custom_fields } = ctx.request.body;
      let user = await User.findByPk(1);
      if (!user) {
        user = await User.create({
          id: 1,
          name,
          autograph,
          email,
          qq,
          weixin,
          custom_fields,
        });
      } else {
        await user.update({
          name,
          autograph,
          email,
          qq,
          weixin,
          custom_fields,
        });
      }
      ctx.body = { success: true, data: user };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }
}

module.exports = UserController;
