import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptRequestDto {
    @ApiProperty({
        description: 'The payload string to be encrypted',
        example: 'Hello, this is a secret message!',
        maxLength: 2000,
        minLength: 0,
    })
    @IsString()
    @Length(0, 2000)
    payload: string;
}