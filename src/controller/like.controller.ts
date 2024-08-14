import { FastifyReply, FastifyRequest } from "fastify";
import { TArticleParam, TCommonHeader, TCommonQuery } from "../schema/types";
import { handleError } from "../lib/error.helper";
import { ERROR_MESSAGE } from "../lib/constants";
import likeService from "../services/like.service";

function likeController() {
  const toggleLike = async (
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
  };

  const readLikes = async (
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
  };
  return {
    toggleLike,
    readLikes,
  };
}

export default likeController();
