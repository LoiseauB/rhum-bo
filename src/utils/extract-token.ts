export const extractToken = (authorization: string) => {
  const [prefix, token] = authorization.split(' ');
  const prefixes = ['Basic', 'Bearer'];

  if (!prefixes.includes(prefix)) return null;

  return token;
};
