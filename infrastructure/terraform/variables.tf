variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "environment" {
  description = "Environment name (staging or production)"
  type        = string
}

variable "allowed_origins" {
  description = "CORS allowed origins"
  type        = list(string)
  default     = ["*"]
}
