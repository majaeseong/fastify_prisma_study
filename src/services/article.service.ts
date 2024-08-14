import { getCrrentDate } from "../lib/date.helper";
import db from "../lib/db";
import { TArticle, TCommonPagenation } from "../schema/types";
import { likeCompareArticles, verifyArticleUser } from "../lib/article.helper";
import { ARTICLE_TYPE, ERROR_MESSAGE } from "../lib/constants";

function articleService() {
  const createArticle = async (id: number, email: string, content: string) => {
    try {
      const value = {
        content,
        userId: id,
        createdAt: getCrrentDate(),
      };

      const newArticle = await db.article.create({
        data: value,
      });

      const returnArticle: TArticle = {
        ...newArticle,
        userEmail: email,
        likeMe: false,
        createdAt: newArticle.createdAt.toString(),
      };
      return returnArticle;
    } catch (error) {
      throw error;
    }
  };

  const updateArticle = async (
    articleId: number,
    content: string,
    userId: number,
    email: string
  ) => {
    try {
      const checkArticleUser = await verifyArticleUser(articleId, userId);

      if (checkArticleUser) {
        const updateArticle = await db.article.update({
          where: {
            id: articleId,
          },
          data: {
            content,
          },
        });

        const returnArticle: TArticle = {
          ...updateArticle,
          userEmail: email,
          likeMe: false,
          createdAt: updateArticle.createdAt.toString(),
        };

        return returnArticle;
      } else {
        throw ERROR_MESSAGE.unauthorized;
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteArticle = async (articleId: number, userId: number) => {
    try {
      const checkArticleUser = await verifyArticleUser(articleId, userId);

      if (checkArticleUser) {
        const result = await db.article.delete({
          where: {
            id: articleId,
          },
        });

        return result;
      } else {
        throw ERROR_MESSAGE.unauthorized;
      }
    } catch (error) {
      throw error;
    }
  };

  const readArticleOne = async (articleId: number) => {
    try {
      const result = await db.article.findUnique({
        where: {
          id: articleId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      if (result) {
        return {
          ...result,
          userEmail: result.user.email,
          likeMe: false,
          createdAt: result.createdAt.toString(),
        };
      } else {
        throw ERROR_MESSAGE.notFound;
      }
    } catch (error) {
      throw error;
    }
  };

  const readArticles = async (
    pageNumber: number,
    mode: string,
    userId?: number
  ) => {
    const size = 10;
    let skip = 0;

    if (pageNumber > 1) skip = (pageNumber - 1) * size;

    let _where = {};

    if (mode === ARTICLE_TYPE.MY) {
      _where = { userId };
    }

    try {
      const articles = await db.article.findMany({
        where: _where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
        skip,
        take: size,
      });

      const articleCount = await db.article.count({
        where: _where,
      });

      let total = Math.ceil(articleCount / size);

      let flattenArticles: TArticle[] = articles.map((a) => {
        return {
          ...a,
          userEmail: a.user.email,
          likeMe: false,
          createdAt: a.createdAt.toString(),
        };
      });

      let returnArticles: TArticle[];

      if (userId) {
        returnArticles = await likeCompareArticles(
          [...flattenArticles],
          userId
        );
      } else {
        returnArticles = [...flattenArticles];
      }

      const returnValue: TCommonPagenation = {
        totalPage: total,
        articleList: returnArticles,
      };

      return returnValue;
    } catch (error) {
      throw error;
    }
  };

  return {
    createArticle,
    updateArticle,
    deleteArticle,
    readArticleOne,
    readArticles,
  };
}

export default articleService();
