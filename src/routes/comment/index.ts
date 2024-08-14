import { FastifyInstance } from "fastify";
import {
  createCommentSchema,
  deleteCommentSchema,
  readCommentSchema,
} from "../../schema";
import { verifySignIn } from "../../lib/auth.helper";

import { verifyCommentUser } from "../../lib/comment.helper";
import commentContorller from "../../controller/comment.controller";

const commentRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    schema: createCommentSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: commentContorller.createComment,
  });

  fastify.route({
    method: "GET",
    schema: readCommentSchema,
    url: "/:articleId",
    handler: commentContorller.readComment,
  });

  fastify.route({
    method: "DELETE",
    schema: deleteCommentSchema,
    url: "/:commentId",
    preHandler: [verifySignIn, verifyCommentUser],
    handler: commentContorller.deleteComment,
  });
};

export default commentRoute;
