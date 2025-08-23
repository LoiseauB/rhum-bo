export interface IImageSaver {
  uploadImage(fileName: string, filePath: Buffer, folderName: string): Promise<string>;
  deleteImage(fileName: string, folderName: string): Promise<void>;
}
