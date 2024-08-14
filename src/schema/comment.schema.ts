import { Type } from "@sinclair/typebox";
import { commonHeaderSchema } from "./common.schema";
import { commonBodySchema, articleParamSchema } from "./article.schema";

const headers = commonHeaderSchema;
const body = commonBodySchema;
const params = articleParamSchema;

const commentSchema = Type.Object({
  id: Type.Number(),
  articleId: Type.Number(),
  content: Type.String(),
  createdAt: Type.String(),
  userId: Type.Number(),
  userEmail: Type.String(),
});

const commentCretaeBodySchema = Type.Object({
  articleId: Type.Number(),
  content: Type.String(),
});

const commentDeleteParamSchema = Type.Object({
  commentId: Type.Number(),
});

//JSON
const createCommentSchema = {
  headers,
  body: commentCretaeBodySchema,
  response: {
    200: commentSchema,
  },
};

const readCommentSchema = {
  params,
  response: {
    200: Type.Object({
      comments: Type.Array(commentSchema),
    }),
  },
};

const deleteCommentSchema = {
  headers,
  params: commentDeleteParamSchema,
  response: {
    200: Type.Object({
      commentId: Type.Number(),
    }),
  },
};

export {
  commentSchema,
  commentCretaeBodySchema,
  commentDeleteParamSchema,
  createCommentSchema,
  readCommentSchema,
  deleteCommentSchema,
};
