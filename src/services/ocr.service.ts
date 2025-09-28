import { IAIClient } from '@/interfaces/ai-client.interface';

export default class OcrService {
  constructor(private readonly aiClient: IAIClient) {}

  async extractTextFromImage(image: { buffer: Buffer; mimeType: string }): Promise<string> {
    const imageBase64 = image.buffer.toString('base64');
    const response = await this.aiClient.vision(
      'Donne moi le nom complet de cette bouteille de rhum. Je veux uniquement le nom complet pas un mot de plus et pas de signe de ponctuation',
      imageBase64,
      image.mimeType,
    );
    if (typeof response !== 'string') {
      throw new Error('Invalid response from AI client');
    }
    return response;
  }
}
