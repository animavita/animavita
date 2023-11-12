import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  deepScanRoutes: true,
};

export const SWAGGER_VERSION = process.env.SWAGGER_VERSION;

class SwaggerSettings extends DocumentBuilder {
  constructor() {
    super();
    this.setTitle('Swagger Animavita');
    this.setDescription(
      'This is a sample server Animavita server. You can find out more about Swagger at [http://swagger.io](http://swagger.io).',
    );
    this.setVersion(SWAGGER_VERSION);
    this.setTermsOfService('http://swagger.io/terms/');
    this.setLicense(
      'GNU General Public License v2.0',
      'https://github.com/animavita/animavita/blob/v2/LICENSE.md',
    );
    this.addBearerAuth();
  }
}

export const swaggerSettings = new SwaggerSettings().build();
