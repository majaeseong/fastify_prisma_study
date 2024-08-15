import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

const swaggerConfig = {
  swagger: {
    info: {
      title: "Backend API",
      description: "RESI API",
      version: "1.0.0",
    },
    host: "localhost:4000",
    basePth: "/",
  },
};

const swaggerUIConfig: FastifySwaggerUiOptions = {
  routePrefix: "/apidocs",
  uiConfig: {
    docExpansion: "list",
  },
};

export { swaggerConfig, swaggerUIConfig };
