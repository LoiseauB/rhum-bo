import { IImageSaver } from '@/interfaces/image-saver.interface';
import getEnvVar from '@/utils/getEnvVar';
import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default class S3Service implements IImageSaver {
  constructor(private readonly s3Client: S3Client) {}
  async uploadImage(fileName: string, filePath: Buffer, folderName: string): Promise<string> {
    try {
      const uploadParams = {
        Bucket: getEnvVar('AWS_BUCKET_NAME'),
        Key: `${folderName}/${fileName}`,
        Body: filePath,
        ACL: 'public-read' as ObjectCannedACL,
      };
      await this.s3Client.send(new PutObjectCommand(uploadParams));

      const publicUrl = `https://${uploadParams.Bucket}.s3.${getEnvVar('AWS_REGION')}.amazonaws.com/${uploadParams.Key}`;
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deleteImage(fileName: string, folderName: string): Promise<void> {
    try {
      const deleteParams = {
        Bucket: getEnvVar('AWS_BUCKET_NAME'),
        Key: `${folderName}/${fileName}`,
      };
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}
