import { FastifyInstance } from "fastify";
import authRoute from "./auth";
import articleRoute from "./article";

const routes = async (fastify: FastifyInstance) => {
  await fastify.register(authRoute, { prefix: "/auth" });
  await fastify.register(articleRoute, { prefix: "/article" });
};

export default routes;
