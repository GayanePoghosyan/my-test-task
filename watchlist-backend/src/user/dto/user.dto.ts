import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class UserDto {
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    googleId?: string
}