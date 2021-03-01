const Router = require('koa-router');
const UserController = require('../controller/user');

const userController = new UserController;
const router = new Router();
const baseUrl = "/api";

router.get(`${baseUrl}/user`, userController.get);
router.post(`${baseUrl}/user`, userController.update);

module.exports = router;