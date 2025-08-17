import { IImageSaver } from '@/interfaces/image-saver.interface';
import getEnvVar from '@/utils/getEnvVar';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class S3Service implements IImageSaver {
  constructor(private readonly s3Client: S3Client) {}
  async uploadImage(fileName: string, filePath: Buffer, folderName: string): Promise<string> {
    try {
      const uploadParams = {
        Bucket: getEnvVar('AWS_BUCKET_NAME'),
        Key: `${folderName}/${fileName}`,
        Body: filePath,
      };
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      const avatarUrl = await getSignedUrl(
        this.s3Client,
        new GetObjectCommand({ Bucket: uploadParams.Bucket, Key: uploadParams.Key }),
      );
      return avatarUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  async deleteImage(fileName: string): Promise<void> {
    try {
      const deleteParams = {
        Bucket: getEnvVar('AWS_BUCKET_NAME'),
        Key: fileName,
      };
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}
