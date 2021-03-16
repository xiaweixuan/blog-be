const Router = require('koa-router');
const UserController = require('../controller/user');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const userController = new UserController;
const router = new Router();
const baseUrl = "/api";

router.get(`${baseUrl}/user`, userController.get);
router.put(`${baseUrl}/user`, authenticity, userController.update);

module.exports = router;