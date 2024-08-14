import { FastifyReply, FastifyRequest } from "fastify";
import db from "./db";
import { TcommentDeleteParam } from "../schema/types";
import { handleError } from "./error.helper";
import { ERROR_MESSAGE } from "./constants";

const compareCommentUser = async (commentId: number, userId: number) => {
  try {
    const comment = await db.comment.findUnique({
      select: {
        userId: true,
      },
      where: {
        id: commentId,
      },
    });

    if (!comment) return false;
    else {
      return comment.userId === userId ? true : false;
    }
  } catch (error) {
    return false;
  }
};

const verifyCommentUser = async (
  req: FastifyRequest<{ Params: TcommentDeleteParam }>,
  rep: FastifyReply
) => {
  const { commentId } = req.params;
  const userId = req.user!.id;

  const result = await compareCommentUser(commentId, userId);

  if (!result) handleError(rep, ERROR_MESSAGE.forbidden);
  return;
};

export { verifyCommentUser };
