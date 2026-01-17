// swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Exam API",
      version: "1.0.0",
      description: "API documentation for Online Exam project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  // Point to your route files for swagger comments
  apis: ["./routes/*.mjs"], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
