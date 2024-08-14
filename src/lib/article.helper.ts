import { TArticle } from "../schema/types";
import db from "./db";

/** 자기 게시글인지 체크하는 함수 */
const verifyArticleUser = async (articleId: number, userId: number) => {
  let result = false;

  try {
    const article = await db.article.findUnique({
      select: {
        userId: true,
      },
      where: {
        id: articleId,
      },
    });
    if (article) {
      result = article.userId === userId ? true : false;
    }
    return result;
  } catch (error) {
    return false;
  }
};

/**좋아요 체크 */
const likeCompareArticles = async (articles: TArticle[], userId: number) => {
  type TArticleIds = {
    articleId: number;
  };

  const articlesIds = articles.map((a) => a.id);

  let likes: TArticleIds[] = await db.like.findMany({
    select: {
      articleId: true,
    },
    where: {
      userId,
      articleId: {
        in: articlesIds,
      },
    },
  });

  const verifyLikeMe = (article: TArticle, likes: TArticleIds[]) => {
    article.likeMe = false;
    const likeArticle = likes.some((like) => like.articleId === article.id);
    if (likeArticle) article.likeMe = true;

    return article;
  };

  const articlesWithLike: TArticle[] = articles.map((a) =>
    verifyLikeMe(a, likes)
  );
  return articlesWithLike;
};

export { verifyArticleUser, likeCompareArticles };
