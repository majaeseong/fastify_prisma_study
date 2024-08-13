import { Type } from "@sinclair/typebox";
import { articleSchema } from "./articleSchema";

const commonHeaderSchema = Type.Object({
  authorization: Type.Optional(Type.String()),
});

const commonQuerySchema = Type.Object({
  pageNumber: Type.Optional(Type.Number()),
  mode: Type.Optional(Type.String()),
});

export { commonHeaderSchema, commonQuerySchema };
