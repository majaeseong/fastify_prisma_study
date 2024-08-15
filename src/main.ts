import Fastify from "fastify";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import routes from "./routes";

import type { FastifyCookieOptions } from "@fastify/cookie";
import fastifyCookie from "@fastify/cookie";
import { SECRET_KEY } from "./lib/constants";
import { currentlyAuthPlugin } from "./plugin/auth.plugin";
import { checkStarupArticle } from "./startup";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig, swaggerUIConfig } from "./config/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

//cors
fastify.register(cors, {
  origin: true,
  credentials: true,
});

//swagger
fastify.register(fastifySwagger, swaggerConfig);
fastify.register(fastifySwaggerUi, swaggerUIConfig);

//cookie
fastify.register(fastifyCookie, {
  secret: SECRET_KEY,
} as FastifyCookieOptions);

fastify.register(currentlyAuthPlugin);
fastify.register(routes);

const start = async () => {
  try {
    await checkStarupArticle(); //더미 데이터 생성
    await fastify.listen({ port: 4000 });
    console.log("Server start!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
