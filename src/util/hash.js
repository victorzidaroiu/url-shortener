import crypto from 'crypto';

export default function hash(data) {
  return crypto.createHash('sha512').update(data).digest('hex').toUpperCase();
}
