import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readLikeSchema, toggleLikeSchema } from "../../schema";
import { verifySignIn } from "../../lib/auth.helper";
import { TArticleParam, TCommonHeader, TCommonQuery } from "../../schema/types";
import { handleError } from "../../lib/error.helper";
import { ERROR_MESSAGE } from "../../lib/constants";

import likeService from "../../services/like.service";
import likeController from "../../controller/like.controller";

const likeRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "PATCH",
    schema: toggleLikeSchema,
    url: "/:articleId",
    preHandler: [verifySignIn],
    handler: likeController.toggleLike,
  });

  fastify.route({
    method: "GET",
    schema: readLikeSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: likeController.readLikes,
  });
};

export default likeRoute;
