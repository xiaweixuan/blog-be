const Router = require('koa-router');
const AudioController = require('../controller/audios');

const audioController = new AudioController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/audios`, audioController.getAudios);
router.post(`${baseUrl}/audio`, audioController.createAudio);
router.put(`${baseUrl}/audio/:audio_id`, audioController.updateAudio);
router.delete(`${baseUrl}/audio/:audio_id`, audioController.removeAudio);

module.exports = router;