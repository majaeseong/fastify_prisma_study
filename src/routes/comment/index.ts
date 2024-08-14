import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  createCommentSchema,
  deleteCommentSchema,
  readCommentSchema,
} from "../../schema";
import { verifySignIn } from "../../lib/authHelper";
import {
  TArticleParam,
  TCommonHeader,
  TcommentCreateBody,
  TcommentDeleteParam,
} from "../../schema/types";
import { handleError } from "../../lib/errorHelper";
import { ERROR_MESSAGE } from "../../lib/constants";
import commentService from "../../services/commentService";
import { verifyCommentUser } from "../../lib/commentHelper";

const commentRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    schema: createCommentSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: async (
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
    },
  });

  fastify.route({
    method: "GET",
    schema: readCommentSchema,
    url: "/:articleId",
    handler: async (
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
    },
  });

  fastify.route({
    method: "DELETE",
    schema: deleteCommentSchema,
    url: "/:commentId",
    preHandler: [verifySignIn, verifyCommentUser],
    handler: async (
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
    },
  });
};

export default commentRoute;
