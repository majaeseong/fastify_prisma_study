import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../auth.schema";
import { commonHeaderSchema, commonQuerySchema } from "../common.schema";
import {
  articleParamSchema,
  articleSchema,
  commonBodySchema,
  articlePagenationSchema,
} from "../article.schema";
import {
  commentCretaeBodySchema,
  commentDeleteParamSchema,
  commentSchema,
} from "../comment.schema";

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
