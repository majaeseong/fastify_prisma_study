import { Type } from "@sinclair/typebox";
import { commonHeaderSchema, commonQuerySchema } from "./commonSchema";

const articleSchema = Type.Object({
  id: Type.Number(),
  content: Type.String(),
  likeCount: Type.Number(),
  commentCount: Type.Number(),
  createdAt: Type.String(),
  userId: Type.Number(),
  userEmail: Type.Optional(Type.String()),
  likeMe: Type.Optional(Type.Boolean()),
});

const commonBodySchema = Type.Object({
  content: Type.String(),
});

const articleParamSchema = Type.Object({
  articleId: Type.Number(),
});

const articlePagenationSchema = Type.Object({
  totalPage: Type.Number(),
  articleList: Type.Array(articleSchema),
});

//JSON Schema
const headers = commonHeaderSchema;
const body = commonBodySchema;
const queryString = commonQuerySchema;

const createArticleSchema = {
  headers,
  body: Type.Object({
    content: Type.String(),
  }),
  response: {
    200: articleSchema,
  },
};

const updateArticleSchema = {
  headers,
  body,
  response: {
    200: articleSchema,
  },
};

const deleteArticleSchema = {
  headers,
  articleParamSchema,
  response: {
    200: articleSchema,
  },
};

const readArticleOneSchema = {
  articleParamSchema,
  response: {
    200: articleSchema,
  },
};

const readArticlesSchema = {
  headers,
  queryString,
  response: {
    200: articlePagenationSchema,
  },
};

export {
  articleSchema,
  commonBodySchema,
  createArticleSchema,
  updateArticleSchema,
  articleParamSchema,
  deleteArticleSchema,
  readArticleOneSchema,
  readArticlesSchema,
};
