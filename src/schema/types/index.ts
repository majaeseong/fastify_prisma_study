import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../authSchema";
import { commonHeaderSchema, commonQuerySchema } from "../commonSchema";
import {
  articleParamSchema,
  articleSchema,
  commonBodySchema,
  articlePagenationSchema,
} from "../articleSchema";
import {
  commentCretaeBodySchema,
  commentDeleteParamSchema,
  commentSchema,
} from "../commentSchema";

type TAtuhBody = Static<typeof authBodySchema>;
type TCommonHeader = Static<typeof commonHeaderSchema>;

type TArticle = Static<typeof articleSchema>;
type TCommonBodySchema = Static<typeof commonBodySchema>;

type TArticleParam = Static<typeof articleParamSchema>;

type TCommonQuery = Static<typeof commonQuerySchema>;
type TCommonPagenation = Static<typeof articlePagenationSchema>;

type Tcomment = Static<typeof commentSchema>;
type TcommentCreateBody = Static<typeof commentCretaeBodySchema>;
type TcommentDeleteParam = Static<typeof commentDeleteParamSchema>;

export {
  TAtuhBody,
  TCommonHeader,
  TArticle,
  TCommonBodySchema,
  TArticleParam,
  TCommonQuery,
  TCommonPagenation,
  Tcomment,
  TcommentCreateBody,
  TcommentDeleteParam,
};
