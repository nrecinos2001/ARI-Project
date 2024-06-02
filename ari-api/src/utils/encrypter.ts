import * as crypto from 'crypto';

export function encrypt(text: string, key: string): string {
  const hashedText = crypto
    .createHmac('sha256', key)
    .update(text)
    .digest('hex');

  return hashedText;
}
