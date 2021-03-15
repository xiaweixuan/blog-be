const Router = require('koa-router');
const ArticleController = require('../controller/articles');

const articleController = new ArticleController;
const router = new Router();
const baseUrl = "/api";


router.get(`${baseUrl}/articles`, articleController.getArticleList);
router.post(`${baseUrl}/article`, articleController.createArticle);
router.put(`${baseUrl}/article/:article_id`, articleController.updateArticle);
router.delete(`${baseUrl}/article/:article_id`, articleController.removeArticle);

router.get(`${baseUrl}/article/tags`, articleController.getTagList);
router.post(`${baseUrl}/article/tag`, articleController.createTag);
router.delete(`${baseUrl}/article/tag/:tag_id`, articleController.removeTag);

router.get(`${baseUrl}/article/types`, articleController.getTypeList);
router.post(`${baseUrl}/article/type`, articleController.createType);
router.delete(`${baseUrl}/article/type/:type_id`, articleController.removeType);

router.get(`${baseUrl}/article/:article_id/comments`, articleController.getCommentList)
router.post(`${baseUrl}/article/:article_id/comment`, articleController.createComment)
router.delete(`${baseUrl}/article/:article_id/comment/:comment_id`, articleController.removeComment)

module.exports = router;