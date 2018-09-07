# CIFE Project Page - Dynamic Worksite Models

Research website for work at Stanford University.
The website is currently served at: [worksite-models.s3-website-us-east-1.amazonaws.com](http://worksite-models.s3-website-us-east-1.amazonaws.com)

## Quick Start
Update npm and node. Then:
```sh
npm run dev
```

## Deployment
Files can be automatically uploaded to S3 for deployment.
The script assumes that the AWS credentials are available in ~/.aws/credentials. To check for the credentials:
```sh
cat ~/.aws/credentials
```
The deployment process builds the static resources, copies files to the `dist` directory, and then syncs the dist directory with S3. To deploy the website:
```sh
npm run deploy
```
## License
MIT