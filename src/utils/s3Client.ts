import { S3Client } from '@aws-sdk/client-s3';
import getEnvVar from './getEnvVar';

export const s3Client = new S3Client({
  region: getEnvVar('AWS_REGION'),
  credentials: {
    accessKeyId: getEnvVar('AWS_ACCESSKEYID'),
    secretAccessKey: getEnvVar('AWS_SECRETACCESSKEY'),
  },
});
