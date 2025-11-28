// crypto.util.ts
import * as crypto from 'crypto';

export function generateAesKey(): string {
    return crypto.randomBytes(32).toString('base64'); // 256-bit key
}

export function aesEncrypt(plain: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(key, 'base64'),
        iv,
    );
    const encrypted = Buffer.concat([
        cipher.update(plain, 'utf8'),
        cipher.final(),
    ]);
    // เอา iv + encrypted base64 รวมกัน
    return Buffer.concat([iv, encrypted]).toString('base64');
}

export function aesDecrypt(cipherText: string, key: string): string {
    const raw = Buffer.from(cipherText, 'base64');
    const iv = raw.slice(0, 16);
    const encrypted = raw.slice(16);
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(key, 'base64'),
        iv,
    );
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
}

export function rsaEncryptWithPrivateKey(text: string, privateKeyPem: string): string {
    const buffer = Buffer.from(text, 'utf8');
    const encrypted = crypto.privateEncrypt(privateKeyPem, buffer);
    return encrypted.toString('base64');
}

export function rsaDecryptWithPublicKey(cipherText: string, publicKeyPem: string): string {
    const buffer = Buffer.from(cipherText, 'base64');
    const decrypted = crypto.publicDecrypt(publicKeyPem, buffer);
    return decrypted.toString('utf8');
}
