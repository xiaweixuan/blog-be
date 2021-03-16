const Router = require('koa-router');
const ScriptController = require('../controller/script');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const scriptController = new ScriptController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/scripts`, scriptController.getScripts);
router.post(`${baseUrl}/script`, authenticity, scriptController.createScript);
router.put(`${baseUrl}/script/:script_id`, authenticity, scriptController.updateScript);
router.delete(`${baseUrl}/script/:script_id`, authenticity, scriptController.removeScript);

module.exports = router;