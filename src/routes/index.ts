import { FastifyInstance } from "fastify";
import authRoute from "./auth";
import articleRoute from "./article";
import commentRoute from "./comment";

const routes = async (fastify: FastifyInstance) => {
  await fastify.register(authRoute, { prefix: "/auth" });
  await fastify.register(articleRoute, { prefix: "/article" });
  await fastify.register(commentRoute, { prefix: "/comment" });
};

export default routes;
