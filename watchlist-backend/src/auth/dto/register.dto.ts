import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    username?: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }