import * as crypto from 'crypto';

function createHash(key: string): Buffer {
  return crypto.createHash('sha256').update(key).digest();
}

export function encryptData(dataToEncript: string, key: string): string[] {
  const iv = crypto.randomBytes(16);
  const hash = createHash(key);
  const stringifiedArr = JSON.stringify(dataToEncript);
  const cipher = crypto.createCipheriv('aes-256-ctr', hash, iv);
  const encrypted = cipher.update(stringifiedArr, 'utf-8', 'hex');
  return [encrypted, iv.toString('hex')];
}

export function decryptData(
  encryptedData: string,
  ivHex: string,
  key: string,
): string {
  const iv = Buffer.from(ivHex, 'hex');
  const hash = createHash(key);
  const decipher = crypto.createDecipheriv('aes-256-ctr', hash, iv);
  const decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  return decrypted;
}