import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../authSchema";
import {
  commonHeaderSchema,
  commonPagenationSchema,
  commonQuerySchema,
} from "../commonSchema";
import {
  articleParamSchema,
  articleSchema,
  commonBodySchema,
} from "../articleSchema";

type TAtuhBody = Static<typeof authBodySchema>;
type TCommonHeader = Static<typeof commonHeaderSchema>;

type TArticle = Static<typeof articleSchema>;
type TCommonBodySchema = Static<typeof commonBodySchema>;

type TArticleParam = Static<typeof articleParamSchema>;

type TCommonQuery = Static<typeof commonQuerySchema>;
type TCommonPagenation = Static<typeof commonPagenationSchema>;

export {
  TAtuhBody,
  TCommonHeader,
  TArticle,
  TCommonBodySchema,
  TArticleParam,
  TCommonQuery,
  TCommonPagenation,
};
