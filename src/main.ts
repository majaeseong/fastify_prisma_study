import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/ping", async (req, res) => {
  return "pong\n";
});

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log("Server start!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
