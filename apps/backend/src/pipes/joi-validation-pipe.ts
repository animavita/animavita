import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(`Validation error: ${error.message}`);
    }

    return value;
  }
}
