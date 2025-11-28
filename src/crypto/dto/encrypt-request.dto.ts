import { IsString, Length } from 'class-validator';

export class EncryptRequestDto {
    @IsString()
    @Length(0, 2000)
    payload: string;
}