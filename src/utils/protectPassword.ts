import { IProtectPassword } from '@/interfaces/protect-password.interface';
import bcrypt from 'bcrypt';
import * as z from 'zod';

export default class ProtectPassword implements IProtectPassword {
  constructor() {}

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async compare(userPassword: string, password: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, password);
  }

  public validatePassword(password: string): boolean {
    const passwordSchema = z
      .string()
      .min(16, { message: 'Le mot de passe doit contenir au moins 16 caractères' })
      .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une lettre majuscule' })
      .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une lettre minuscule' })
      .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' })
      // eslint-disable-next-line no-useless-escape
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: 'Le mot de passe doit contenir au moins un caractère spécial',
      });

    try {
      passwordSchema.parse(password);
      return true;
    } catch (error) {
      throw new Error(error.errors);
      return false;
    }
  }
}
