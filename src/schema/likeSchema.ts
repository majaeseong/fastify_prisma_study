import { Type } from "@sinclair/typebox";
import { commonHeaderSchema, commonQuerySchema } from "./commonSchema";
import { articlePagenationSchema, articleParamSchema } from "./articleSchema";

const headers = commonHeaderSchema;
const params = articleParamSchema;
const queryString = commonQuerySchema;

const toggleLikeSchema = {
  headers,
  params,
  response: {
    200: Type.Boolean(),
  },
};

const readLikeSchema = {
  headers,
  queryString,
  response: {
    200: articlePagenationSchema,
  },
};

export { toggleLikeSchema, readLikeSchema };
