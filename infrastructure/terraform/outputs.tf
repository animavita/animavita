output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.animavita_uploads.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.animavita_uploads.arn
}

output "bucket_region" {
  description = "Region of the S3 bucket"
  value       = aws_s3_bucket.animavita_uploads.region
}

output "iam_user_name" {
  description = "Name of the IAM user"
  value       = aws_iam_user.s3_user.name
}

output "access_key_id" {
  description = "AWS access key ID"
  value       = aws_iam_access_key.s3_user_key.id
  sensitive   = true
}

output "secret_access_key" {
  description = "AWS secret access key"
  value       = aws_iam_access_key.s3_user_key.secret
  sensitive   = true
}
