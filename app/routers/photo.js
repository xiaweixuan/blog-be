const Router = require('koa-router');
const PhotoController = require('../controller/photo');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const photoController = new PhotoController;
const router = new Router();
const baseUrl = "/api";

router.get(`${baseUrl}/photos`, photoController.getPhotos)
router.post(`${baseUrl}/photo`, authenticity, photoController.createPhoto)
router.put(`${baseUrl}/photo/:photo_id`, authenticity, photoController.updatePhoto)
router.delete(`${baseUrl}/photo/:photo_id`, authenticity, photoController.removePhoto)

module.exports = router;