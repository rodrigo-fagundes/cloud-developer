export const config = {
  "postgress": {
    "username": process.env.POSTRGRESS_USERNAME,
    "password": process.env.POSTRGRESS_PASSWORD,
    "database": process.env.POSTRGRESS_DATABASE,
    "host": process.env.POSTRGRESS_HOST,
    "dialect": "postgres",
  },
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_BUCKET,
  }
}
