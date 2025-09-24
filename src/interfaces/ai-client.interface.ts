export interface IAIClient {
  vision(text: string, imageBase64: string, imageType: string): Promise<string | unknown>;
}
