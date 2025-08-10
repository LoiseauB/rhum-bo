export default function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value || '';
}
