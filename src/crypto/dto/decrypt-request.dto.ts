import { IsString } from 'class-validator';

export class DecryptRequestDto {
    @IsString()
    data1: string;

    @IsString()
    data2: string;
}