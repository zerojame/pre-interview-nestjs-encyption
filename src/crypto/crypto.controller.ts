import { Controller, Post, Body } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EncryptRequestDto } from './dto/encrypt-request.dto';
import { DecryptRequestDto } from './dto/decrypt-request.dto';

@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @Post('get-encrypt-data')
  encrypt(@Body() encryptRequestDto: EncryptRequestDto) {

    try {
      const data = this.cryptoService
        .encryptPayload(encryptRequestDto.payload);

      return {
        successful: true,
        error_code: "",
        data,
      }

    } catch (error) {
      return {
        successful: false,
        error_code: error.code || "INTERNAL_SERVER_ERROR",
        data: null,
      }
    }
  }

  @Post('get-decrypt-data')
  decrypt(@Body() decryptRequestDto: DecryptRequestDto) {
    try {
      const data = this.cryptoService
        .decryptPayload(decryptRequestDto.data1, decryptRequestDto.data2);

      return {
        successful: true,
        error_code: "",
        data,
      }
    } catch (error) {
      return {
        successful: false,
        error_code: error.code || "INTERNAL_SERVER_ERROR",
        data: null,
      }
    }
  }
}
