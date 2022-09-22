const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const uploadFileToS3 = async (body) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: body.buffer,
    Key: body.originalname,
    ContentType: body.mimetype,
  };
  // Send the upload to S3
  return await s3Client.send(new PutObjectCommand(uploadParams));
};

const downloadFileToS3 = async (fileKey) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileKey,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  console.log(url);
  return url;
};

module.exports = { uploadFileToS3, downloadFileToS3 };
