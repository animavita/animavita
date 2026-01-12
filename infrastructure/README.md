# Animavita Infrastructure

Infrastructure as Code for Animavita using Terraform.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads) >= 1.0
- AWS CLI configured with credentials (`aws configure`)
- AWS account with appropriate permissions

## Structure

```
infrastructure/
└── terraform/
    ├── main.tf              # Main infrastructure configuration
    ├── variables.tf         # Variable definitions
    ├── outputs.tf           # Output values
    ├── staging.tfvars       # Staging environment variables
    ├── production.tfvars    # Production environment variables
    └── .gitignore          # Terraform-specific ignores
```

## Usage

### Initialize Terraform

```bash
cd infrastructure/terraform
terraform init
```

### Deploy Staging Environment

```bash
# Preview changes
terraform plan -var-file="staging.tfvars"

# Apply changes
terraform apply -var-file="staging.tfvars"

# Get credentials (save these securely!)
terraform output -json
```

### Deploy Production Environment

```bash
# Preview changes
terraform plan -var-file="production.tfvars"

# Apply changes
terraform apply -var-file="production.tfvars"

# Get credentials (save these securely!)
terraform output -json
```

### Retrieve Credentials

After applying, get the AWS credentials:

```bash
# Show all outputs (except sensitive ones)
terraform output

# Show sensitive outputs (access keys)
terraform output access_key_id
terraform output secret_access_key
```

Add these to your backend `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<from terraform output>
AWS_SECRET_ACCESS_KEY=<from terraform output>
AWS_S3_BUCKET_NAME=<from terraform output>
```

## What Gets Created

- **S3 Bucket** - For storing uploaded images
- **CORS Configuration** - Allows uploads from web/mobile apps
- **Bucket Policy** - Enables public read access for images
- **IAM User** - Dedicated user for application access
- **IAM Policy** - Grants upload/download/delete permissions
- **Access Keys** - Credentials for the application

## Security Notes

- Public read access is enabled on bucket contents (required for image URLs to work)
- Public write access is blocked (only authenticated app can upload)
- Never commit `.tfstate` files (contain sensitive data)
- Store credentials securely (use AWS Secrets Manager or environment variables)

## Cleanup

To destroy all resources (use with caution):

```bash
terraform destroy -var-file="staging.tfvars"
# or
terraform destroy -var-file="production.tfvars"
```

## Cost Considerations

- S3 storage: ~$0.023 per GB/month
- Data transfer: First 100 GB/month free, then ~$0.09 per GB
- Requests: GET requests are cheap (~$0.0004 per 1,000 requests)
- For a typical pet adoption app, expect ~$5-20/month depending on usage
