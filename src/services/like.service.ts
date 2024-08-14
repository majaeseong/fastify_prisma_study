import db from "../lib/db";
import { TArticle } from "../schema/types";

function likeService() {
  const toggleLike = async (articleId: number, userId: number) => {
    try {
      const existLike = await db.like.count({
        where: {
          articleId,
          userId,
        },
      });
      if (existLike) {
        await db.like.deleteMany({
          where: {
            articleId,
            userId,
          },
        });

        await db.article.update({
          where: {
            id: articleId,
          },
          data: {
            likeCount: { decrement: 1 },
          },
        });
      } else {
        const value = {
          userId,
          articleId,
        };
        await db.like.create({
          data: value,
        });

        await db.article.update({
          where: {
            id: articleId,
          },
          data: {
            likeCount: { increment: 1 },
          },
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const readLikes = async (pageNumber: number, userId: number) => {
    const size = 10;
    let skip = 0;
    try {
      if (pageNumber > 1) skip = (pageNumber - 1) * size;

      const likes = await db.like.findMany({
        where: {
          userId,
        },
        include: {
          article: {
            select: {
              id: true,
              content: true,
              commentCount: true,
              likeCount: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  email: true,
                },
              },
            },
          },
        },
        skip,
        take: size,
        orderBy: {
          id: "desc",
        },
      });

      const totalCount = await db.like.count({
        where: { userId },
      });

      const totalPageCount = Math.ceil(totalCount / size);

      let flatternLikes: TArticle[] = likes.map((like) => {
        return {
          ...like.article,
          userId: like.article.user.id,
          userEmail: like.article.user.email,
          createdAt: like.article.createdAt.toString(),
          likeMe: true,
        };
      });

      return { totalPage: totalPageCount, articleList: flatternLikes };
    } catch (error) {
      throw error;
    }
  };

  return {
    toggleLike,
    readLikes,
  };
}

export default likeService();
