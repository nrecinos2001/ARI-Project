import * as crypto from 'crypto';
const key = 'body.storeId';

export function encrypt(text: string): string {
  const hashedText = crypto
    .createHmac('sha256', key)
    .update(text)
    .digest('hex');

  return hashedText;
}
