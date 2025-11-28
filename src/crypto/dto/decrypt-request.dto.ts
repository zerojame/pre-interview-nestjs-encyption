import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptRequestDto {
    @ApiProperty({
        description: 'The encrypted data (base64 encoded)',
        example: 'U2FsdGVkX1...',
    })
    @IsString()
    data1: string;

    @ApiProperty({
        description: 'The encrypted AES key (base64 encoded)',
        example: 'MIIBIjANBgkq...',
    })
    @IsString()
    data2: string;
}