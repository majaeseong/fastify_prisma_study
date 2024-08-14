import { getCrrentDate } from "../lib/date.helper";
import db from "../lib/db";
import { Tcomment } from "../schema/types";

function commentService() {
  const createComment = async (
    articleId: number,
    content: string,
    userId: number,
    userEmail: string
  ) => {
    try {
      const value = {
        articleId,
        userId,
        content,
        createdAt: getCrrentDate(),
      };

      const newComment = await db.comment.create({
        data: value,
      });

      await db.article.update({
        where: {
          id: articleId,
        },
        data: {
          commentCount: { increment: 1 },
        },
      });

      return {
        ...newComment,
        userId,
        userEmail,
      };
    } catch (error) {
      throw error;
    }
  };

  const readComment = async (articleId: number) => {
    try {
      const comments = await db.comment.findMany({
        where: {
          articleId,
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

      let flatternComments: Tcomment[] = comments.map((comment) => {
        return {
          ...comment,
          userEmail: comment.user.email,
          createdAt: comment.createdAt.toString(),
        };
      });

      return { comments: flatternComments };
    } catch (error) {
      throw error;
    }
  };

  const deleteComment = async (commentId: number, userId: number) => {
    try {
      const result = await db.comment.delete({
        where: {
          id: commentId,
        },
      });

      await db.article.update({
        where: {
          id: result.articleId,
        },
        data: {
          commentCount: { decrement: 1 },
        },
      });

      return {
        commentId: result.id,
      };
    } catch (error) {
      throw error;
    }
  };

  return {
    createComment,
    readComment,
    deleteComment,
  };
}

export default commentService();
