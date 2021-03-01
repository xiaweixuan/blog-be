const Router = require('koa-router');
const LoginController = require('../controller/login');

const loginController = new LoginController;
const router = new Router();
const baseUrl = "/api";

router.post(`${baseUrl}/login`, loginController.signIn);
router.get(`${baseUrl}/login`, loginController.forgot);

module.exports = router;