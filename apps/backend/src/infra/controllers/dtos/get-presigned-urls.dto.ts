import {
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
  IsOptional,
  Matches,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FileUploadDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message:
      'filename must only contain alphanumeric characters, dots, hyphens, and underscores',
  })
  filename?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+\/[a-zA-Z0-9+.-]+$/, {
    message: 'contentType must be a valid MIME type (e.g., image/jpeg)',
  })
  contentType?: string;
}

export class GetPresignedUrlsDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'files array must contain at least 1 file' })
  @ArrayMaxSize(10, { message: 'Maximum 10 files allowed per request' })
  @ValidateNested({ each: true })
  @Type(() => FileUploadDto)
  files: FileUploadDto[];
}
