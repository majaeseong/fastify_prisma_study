import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readLikeSchema, toggleLikeSchema } from "../../schema";
import { verifySignIn } from "../../lib/authHelper";
import { TArticleParam, TCommonHeader, TCommonQuery } from "../../schema/types";
import { handleError } from "../../lib/errorHelper";
import { ERROR_MESSAGE } from "../../lib/constants";

import likeService from "../../services/likeService";

const likeRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "PATCH",
    schema: toggleLikeSchema,
    url: "/:articleId",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{ Headers: TCommonHeader; Params: TArticleParam }>,
      rep: FastifyReply
    ) => {
      const { articleId } = req.params;
      const userId = req.user!.id;

      try {
        const result = await likeService.toggleLike(articleId, userId);
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });

  fastify.route({
    method: "GET",
    schema: readLikeSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{
        Headers: TCommonHeader;
        Querystring: TCommonQuery;
      }>,
      rep: FastifyReply
    ) => {
      const { pageNumber = 0 } = req.query;
      const userId = req.user!.id;

      try {
        const result = await likeService.readLikes(pageNumber, userId);
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });
};

export default likeRoute;
