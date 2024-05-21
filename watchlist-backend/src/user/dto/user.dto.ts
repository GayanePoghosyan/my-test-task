import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';

export class UserDto {
    @IsNumber()
    userId:number
    
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
    @IsString()
    email: string;
}