const Router = require('koa-router');
const PhotoController = require('../controller/photo');

const photoController = new PhotoController;
const router = new Router();
const baseUrl = "/api";

router.get(`${baseUrl}/photos`, photoController.getPhotos)
router.post(`${baseUrl}/photo`, photoController.createPhoto)
router.put(`${baseUrl}/photo/:photo_id`, photoController.updatePhoto)
router.delete(`${baseUrl}/photo/:photo_id`, photoController.removePhoto)

module.exports = router;