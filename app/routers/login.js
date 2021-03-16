const Router = require('koa-router');
const LoginController = require('../controller/login');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const loginController = new LoginController;
const router = new Router();
const baseUrl = "/api";

router.get(`${baseUrl}/login`, loginController.signIn);
router.get(`${baseUrl}/verifyLogin`, authenticity, loginController.verifyLogin);

module.exports = router;