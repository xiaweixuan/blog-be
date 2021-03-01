const Router = require('koa-router');
const ScriptController = require('../controller/script');

const scriptController = new ScriptController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/scripts`, scriptController.getScripts);
router.post(`${baseUrl}/script`, scriptController.createScript);
router.put(`${baseUrl}/script/:script_id`, scriptController.updateScript);
router.delete(`${baseUrl}/script/:script_id`, scriptController.removeScript);

module.exports = router;