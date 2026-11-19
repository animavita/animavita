terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "animavita_uploads" {
  bucket = var.bucket_name

  tags = {
    Name        = "Animavita Uploads"
    Environment = var.environment
    Project     = "animavita"
  }
}

resource "aws_s3_bucket_cors_configuration" "animavita_uploads" {
  bucket = aws_s3_bucket.animavita_uploads.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
    allowed_origins = var.allowed_origins
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "animavita_uploads" {
  bucket = aws_s3_bucket.animavita_uploads.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.animavita_uploads.id

  depends_on = [aws_s3_bucket_public_access_block.animavita_uploads]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.animavita_uploads.arn}/*"
      }
    ]
  })
}

resource "aws_iam_user" "s3_user" {
  name = "animavita-s3-${var.environment}"
  path = "/system/"

  tags = {
    Environment = var.environment
    Project     = "animavita"
  }
}

resource "aws_iam_user_policy" "s3_user_policy" {
  name = "AnimavitaS3Access"
  user = aws_iam_user.s3_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.animavita_uploads.arn,
          "${aws_s3_bucket.animavita_uploads.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_access_key" "s3_user_key" {
  user = aws_iam_user.s3_user.name
}
