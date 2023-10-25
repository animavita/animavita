import { SwaggerDocumentOptions } from "@nestjs/swagger/dist/interfaces/swagger-document-options.interface";

export const swaggerDocumentOptions: SwaggerDocumentOptions = { deepScanRoutes: true };
export const SWAGGER_VERSION = process.env.SWAGGER_VERSION;
