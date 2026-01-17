import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Exam System API",
      version: "1.0.0",
      description: "RESTful API for Online Exam Platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.mjs"], // عدّل حسب مكان routes
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
