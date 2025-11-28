// crypto.service.ts
import { Injectable } from '@nestjs/common';
import {
  generateAesKey,
  aesEncrypt,
  aesDecrypt,
  rsaEncryptWithPrivateKey,
  rsaDecryptWithPublicKey,
} from '../../util/crypto.util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CryptoService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    const keyDir = path.join(process.cwd(), 'config/keys');
    this.privateKey = fs.readFileSync(path.join(keyDir, 'private.pem'), 'utf8');
    this.publicKey = fs.readFileSync(path.join(keyDir, 'public.pem'), 'utf8');
  }

  encryptPayload(payload: string) {
    // step 2: gen AES key
    const aesKey = generateAesKey();

    // step 3: data2 = encrypt payload with AES key
    const data2 = aesEncrypt(payload, aesKey);

    // step 4: data1 = encrypt AES key with private key
    const data1 = rsaEncryptWithPrivateKey(aesKey, this.privateKey);

    return { data1, data2 };
  }

  decryptPayload(data1: string, data2: string) {
    // step 2: get AES key by decrypt data1 with public key
    const aesKey = rsaDecryptWithPublicKey(data1, this.publicKey);

    // step 3: get payload by decrypt data2 with AES key
    const payload = aesDecrypt(data2, aesKey);

    return { payload };
  }
}
