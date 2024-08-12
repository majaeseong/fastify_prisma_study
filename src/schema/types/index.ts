import { Static } from "@sinclair/typebox";
import { authBodySchema } from "../authSchema";
import { commonHeaderSchema } from "../commonSchema";

type TAtuhBody = Static<typeof authBodySchema>;
type TCommonHeader = Static<typeof commonHeaderSchema>;

export { TAtuhBody, TCommonHeader };
