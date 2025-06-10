// utils/token.ts
export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string) {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}