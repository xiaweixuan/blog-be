const Router = require('koa-router');
const ArticleController = require('../controller/articles');
const authenticateToken = require('../middleware/authenticate');

const authenticity = authenticateToken({ secret: process.env.JWT_SECRET });
const articleController = new ArticleController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/articles`, articleController.getArticleList);
router.post(`${baseUrl}/article`, authenticity, articleController.createArticle);
router.put(`${baseUrl}/article/:article_id`, authenticity, articleController.updateArticle);
router.delete(`${baseUrl}/article/:article_id`, authenticity, articleController.removeArticle);

router.get(`${baseUrl}/article/tags`, articleController.getTagList);
router.post(`${baseUrl}/article/tag`, authenticity, articleController.createTag);
router.delete(`${baseUrl}/article/tag/:tag_id`, authenticity, articleController.removeTag);

router.get(`${baseUrl}/article/types`, articleController.getTypeList);
router.post(`${baseUrl}/article/type`, authenticity, articleController.createType);
router.delete(`${baseUrl}/article/type/:type_id`, authenticity, articleController.removeType);

router.get(`${baseUrl}/article/:article_id/comments`, articleController.getCommentList)
router.post(`${baseUrl}/article/:article_id/comment`, authenticity, articleController.createComment)
router.delete(`${baseUrl}/article/:article_id/comment/:comment_id`, authenticity, articleController.removeComment)

module.exports = router;