import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createArticleSchema,
  deleteArticleSchema,
  readArticleOneSchema,
  readArticlesSchema,
  updateArticleSchema,
} from "../../schema";
import {
  TArticleParam,
  TCommonBodySchema,
  TCommonHeader,
  TCommonQuery,
} from "../../schema/types";
import { handleError } from "../../lib/errorHelper";
import { ARTICLE_TYPE, ERROR_MESSAGE } from "../../lib/constants";
import articleService from "../../services/articleService";
import { verifySignIn } from "../../lib/authHelper";

const articleRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    schema: createArticleSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{ Headers: TCommonHeader; Body: TCommonBodySchema }>,
      rep: FastifyReply
    ) => {
      const { content } = req.body;
      const userId = req.user!.id;
      const email = req.user!.email;

      try {
        const result = await articleService.createArticle(
          userId,
          email,
          content
        );
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });

  fastify.route({
    method: "PATCH",
    schema: updateArticleSchema,
    url: "/:articleId",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{
        Headers: TCommonHeader;
        Body: TCommonBodySchema;
        Params: TArticleParam;
      }>,
      rep: FastifyReply
    ) => {
      const { content } = req.body;
      const { articleId } = req.params;
      const userId = req.user!.id;
      const email = req.user!.email;

      try {
        const result = await articleService.updateArticle(
          Number(articleId),
          content,
          userId,
          email
        );
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });

  fastify.route({
    method: "DELETE",
    schema: deleteArticleSchema,
    url: "/:articleId",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{ Headers: TCommonHeader; Params: TArticleParam }>,
      rep: FastifyReply
    ) => {
      const { articleId } = req.params;
      const userId = req.user!.id;

      try {
        const result = await articleService.deleteArticle(
          Number(articleId),
          userId
        );
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });

  fastify.route({
    method: "GET",
    schema: readArticleOneSchema,
    url: "/:articleId",
    handler: async (
      req: FastifyRequest<{ Params: TArticleParam }>,
      rep: FastifyReply
    ) => {
      const { articleId } = req.params;

      try {
        const result = await articleService.readArticleOne(Number(articleId));
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });

  fastify.route({
    method: "GET",
    schema: readArticlesSchema,
    url: "/",
    handler: async (
      req: FastifyRequest<{
        Headers: TCommonHeader;
        Querystring: TCommonQuery;
      }>,
      rep: FastifyReply
    ) => {
      const { pageNumber = 0, mode = ARTICLE_TYPE.ALL } = req.query;
      const userId = req.user?.id;
      try {
        const result = await articleService.readArticles(
          pageNumber,
          mode,
          userId
        );
        rep.status(200).send(result);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    },
  });
};

export default articleRoute;
