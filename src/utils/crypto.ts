import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

function getKey() {
  // In Astro dev/build, import.meta.env might be available
  // In pure Node.js scripts (like our migration script), process.env is used.
  const keyHex = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.REVIEW_ENCRYPTION_KEY : null) || process.env.REVIEW_ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('REVIEW_ENCRYPTION_KEY must be 64 hex characters (32 bytes) in .env');
  }
  return Buffer.from(keyHex, 'hex');
}

export function encryptReviews(data: any) {
  const key = getKey();
  const text = JSON.stringify(data);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

export function decryptReviews(encryptedPayload: { iv: string, encryptedData: string }) {
  const key = getKey();
  const iv = Buffer.from(encryptedPayload.iv, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedPayload.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}
