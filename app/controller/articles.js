const { Article, ArticleType, ArticleTag, Comment } = require('../models');

class ArticleController {

  async getArticleList(ctx) {
    const queryArticleIncludeOption = {
      include: [
        {
          model: ArticleTag,
          attributes: ['id', 'name']
        },
        {
          model: ArticleType,
          attributes: ['id', 'name']
        },
      ]
    };
    try {
      const { tag_id, type_id } = ctx.query;
      if (tag_id && type_id) {
        const tag = await ArticleTag.findOne({
          where: {
            id: tag_id
          },
          include: Article
        });
        const articleOfTagList = tag.Articles.map(item => item.id);
        const type = await ArticleType.findOne({
          where: {
            id: type_id
          },
          include: Article
        });
        const articleOfTypeList = type.Articles.map(item => item.id);
        const commonList = articleOfTagList.filter(num => articleOfTypeList.includes(num));
        const result = await Article.findAll({
          where: {
            id: commonList,
          },
          ...queryArticleIncludeOption
        });
        ctx.body = { success: true, data: result };
        ctx.status = 200;
        return;
      }
      if (tag_id) {
        const tag = await ArticleTag.findOne({
          where: {
            id: tag_id
          }
        });
        const result = await tag.getArticles(queryArticleIncludeOption);
        ctx.body = { success: true, data: result };
        ctx.status = 200;
        return;
      }
      if (type_id) {
        const type = await ArticleType.findOne({
          where: {
            id: type_id
          }
        });
        const result = await type.getArticles(queryArticleIncludeOption);
        ctx.body = { success: true, data: result };
        ctx.status = 200;
        return;
      }
      const result = await Article.findAll(queryArticleIncludeOption);
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createArticle(ctx) {
    try {
      const { title, cover, synopsis, content, tag_list, type_list, json_content } = ctx.request.body;
      const article = await Article.create({
        title,
        cover,
        synopsis,
        content,
        view_count: 0,
        json_content,
      });
      if (tag_list && tag_list.length) {
        let tags = await ArticleTag.findAll({ where: { id: tag_list } });
        await article.setArticleTags(tags)
      }
      if (type_list && type_list.length) {
        let types = await ArticleType.findAll({ where: { id: type_list } });
        await article.setArticleTypes(types);
      }
      const ArticleTags = await article.getArticleTags();
      const ArticleTypes = await article.getArticleTypes();
      ctx.body = {
        success: true,
        data: {
          ...article.toJSON(),
          ArticleTags,
          ArticleTypes
        }
      };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async updateArticle(ctx) {
    try {
      const { article_id: id } = ctx.params
      const { title, cover, synopsis, content, tag_list, type_list, json_content, view_count } = ctx.request.body;
      const article = await Article.findByPk(id);
      if (!article) {
        throw new global.errs.NotFound('没有找到相关文章');
      }
      await article.update({
        title,
        cover,
        synopsis,
        content,
        view_count,
        json_content,
      });
      if (tag_list && tag_list.length) {
        let tags = await ArticleTag.findAll({ where: { id: tag_list } });
        await article.setArticleTags(tags)
      }
      if (type_list && type_list.length) {
        let types = await ArticleType.findAll({ where: { id: type_list } });
        await article.setArticleTypes(types);
      }
      const ArticleTags = await article.getArticleTags();
      const ArticleTypes = await article.getArticleTypes();
      ctx.body = {
        success: true,
        data: {
          ...article.toJSON(),
          ArticleTags,
          ArticleTypes
        }
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeArticle(ctx) {
    try {
      const { article_id: id } = ctx.params
      const article = await Article.findByPk(id);
      if (!article) {
        throw new global.errs.NotFound('没有找到相关文章');
      }
      const comments = await Comment.findAll({
        where: {
          article_id: id
        }
      });
      comments.forEach(async (item) => await item.destroy());
      await article.setArticleTags([]);
      await article.setArticleTypes([]);
      await article.destroy({ cascade: false })
      ctx.body = { success: true, id: Number(id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async getTagList(ctx) {
    try {
      const result = await ArticleTag.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createTag(ctx) {
    try {
      const { name } = ctx.request.body;
      const result = await ArticleTag.create({
        name,
      });
      ctx.body = { success: true, data: result };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeTag(ctx) {
    try {
      const { tag_id: id } = ctx.params;
      const tag = await ArticleTag.findByPk(id);
      if (!tag) {
        throw new global.errs.NotFound('没有找到相关标签');
      }
      await tag.setArticles([]);
      await tag.destroy();
      ctx.body = { success: true, id: Number(id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async getTypeList(ctx) {
    try {
      const result = await ArticleType.findAll();
      ctx.body = { success: true, data: result };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createType(ctx) {
    try {
      const { name } = ctx.request.body;
      const result = await ArticleType.create({
        name,
      });
      ctx.body = { success: true, data: result };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeType(ctx) {
    try {
      const { type_id: id } = ctx.params;
      const type = await ArticleType.findByPk(id);
      if (!type) {
        throw new global.errs.NotFound('没有找到相关类别');
      }
      await type.setArticles([]);
      await type.destroy()
      ctx.body = { success: true, id: Number(id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async getCommentList(ctx) {
    try {
      const { article_id } = ctx.params;
      const comment = await Comment.findAll({
        where: {
          article_id
        }
      });
      ctx.body = { success: true, data: comment };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async createComment(ctx) {
    try {
      const { article_id } = ctx.params;
      const { content, author, email } = ctx.request.body;
      const result = await Comment.create({
        article_id,
        content,
        author,
        email,
      });
      ctx.body = { success: true, data: result };
      ctx.status = 201;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

  async removeComment(ctx) {
    try {
      const { comment_id: id } = ctx.params;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new global.errs.NotFound('没有找到相关类别');
      }
      await comment.destroy()
      ctx.body = { success: true, id: Number(id) };
      ctx.status = 200;
    } catch (error) {
      ctx.body = { success: false, error };
      ctx.status = 500;
    }
  }

}
module.exports = ArticleController;