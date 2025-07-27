import bcrypt from 'bcrypt';

export default class ProtectPassword {
  private password: string;
  constructor(password: string) {
    this.password = password;
  }

  public async hash(): Promise<string> {
    return await bcrypt.hash(this.password, 10);
  }

  public async compare(userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password);
  }
}
