import { FastifyReply, FastifyRequest } from "fastify";
import {
  TArticleParam,
  TCommonHeader,
  TcommentCreateBody,
  TcommentDeleteParam,
} from "../schema/types";
import commentService from "../services/comment.service";
import { handleError } from "../lib/error.helper";
import { ERROR_MESSAGE } from "../lib/constants";

function commnetController() {
  const createComment = async (
    req: FastifyRequest<{ Headers: TCommonHeader; Body: TcommentCreateBody }>,
    rep: FastifyReply
  ) => {
    const { articleId, content } = req.body;
    const userId = req.user!.id;
    const userEmail = req.user!.email;

    try {
      const result = await commentService.createComment(
        articleId,
        content,
        userId,
        userEmail
      );
      rep.status(200).send(result);
    } catch (error) {
      handleError(rep, ERROR_MESSAGE.badRequest, error);
    }
  };

  const readComment = async (
    req: FastifyRequest<{ Headers: TCommonHeader; Params: TArticleParam }>,
    rep: FastifyReply
  ) => {
    const { articleId } = req.params;

    try {
      const result = await commentService.readComment(articleId);
      rep.status(200).send(result);
    } catch (error) {
      handleError(rep, ERROR_MESSAGE.badRequest, error);
    }
  };

  const deleteComment = async (
    req: FastifyRequest<{
      Headers: TCommonHeader;
      Params: TcommentDeleteParam;
    }>,
    rep: FastifyReply
  ) => {
    const { commentId } = req.params;
    const userId = req.user!.id;

    try {
      const result = await commentService.deleteComment(commentId, userId);
      rep.status(200).send(result);
    } catch (error) {
      handleError(rep, ERROR_MESSAGE.badRequest, error);
    }
  };

  return {
    createComment,
    readComment,
    deleteComment,
  };
}

export default commnetController();
