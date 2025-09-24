import { IAIClient } from '@/interfaces/ai-client.interface';
import { Mistral } from '@mistralai/mistralai';
import { ContentChunk } from '@mistralai/mistralai/models/components';
import getEnvVar from './getEnvVar';

export default class MistralAI implements IAIClient {
  client: Mistral;
  constructor() {
    this.client = new Mistral({ apiKey: getEnvVar('MISTRAL_AI_KEY') });
  }

  async vision(text: string, imageBase64: string, imageType: string): Promise<string | ContentChunk[]> {
    try {
      const response = await this.client.chat.complete({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text },
              {
                type: 'image_url',
                imageUrl: `data:${imageType};base64,${imageBase64}`,
              },
            ],
          },
        ],
      });

      if (!response.choices[0].message.content) {
        throw new Error('No response from Mistral AI');
      }

      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(error);
    }
  }
}
