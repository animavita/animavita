import { IsString, IsOptional, Matches, MaxLength } from 'class-validator';

export class GetPresignedUrlQueryDto {
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
