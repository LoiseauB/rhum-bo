export interface IProtectPassword {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
  validatePassword(password: string): boolean;
}
