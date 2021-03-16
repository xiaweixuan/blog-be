const Router = require('koa-router');
const AudioController = require('../controller/audios');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const audioController = new AudioController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/audios`, audioController.getAudios);
router.post(`${baseUrl}/audio`, authenticity, audioController.createAudio);
router.put(`${baseUrl}/audio/:audio_id`, authenticity, audioController.updateAudio);
router.delete(`${baseUrl}/audio/:audio_id`, authenticity, audioController.removeAudio);

module.exports = router;