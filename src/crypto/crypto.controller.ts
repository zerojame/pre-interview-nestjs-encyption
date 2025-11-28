import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { EncryptRequestDto } from './dto/encrypt-request.dto';
import { DecryptRequestDto } from './dto/decrypt-request.dto';

@ApiTags('crypto')
@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @Post('get-encrypt-data')
  @ApiOperation({
    summary: 'Encrypt data',
    description: 'Encrypts the provided payload using RSA and AES encryption. Returns encrypted data and encrypted key.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data successfully encrypted',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: true },
        error_code: { type: 'string', example: '' },
        data: {
          type: 'object',
          properties: {
            data1: { type: 'string', description: 'Encrypted data (base64)' },
            data2: { type: 'string', description: 'Encrypted AES key (base64)' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation or client error',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: false },
        error_code: { type: 'string', example: 'VALIDATION_ERROR' },
        data: { type: 'null', example: null },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: false },
        error_code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
        data: { type: 'null', example: null },
      },
    },
  })
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
      const statusCode = error.code ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      throw new HttpException({
        successful: false,
        error_code: errorCode,
        data: null,
      }, statusCode);
    }
  }

  @Post('get-decrypt-data')
  @ApiOperation({
    summary: 'Decrypt data',
    description: 'Decrypts the provided encrypted data using the encrypted AES key. Returns the original payload.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data successfully decrypted',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: true },
        error_code: { type: 'string', example: '' },
        data: { type: 'string', description: 'Decrypted payload' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation or client error',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: false },
        error_code: { type: 'string', example: 'VALIDATION_ERROR' },
        data: { type: 'null', example: null },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        successful: { type: 'boolean', example: false },
        error_code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
        data: { type: 'null', example: null },
      },
    },
  })
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
      const statusCode = error.code ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      throw new HttpException({
        successful: false,
        error_code: errorCode,
        data: null,
      }, statusCode);
    }
  }
}
