#!/bin/bash

echo "Creating S3 bucket..."
awslocal s3 mb s3://animavita-uploads
awslocal s3api put-bucket-cors --bucket animavita-uploads --cors-configuration '{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"]
    }
  ]
}'
echo "S3 bucket created successfully!"
