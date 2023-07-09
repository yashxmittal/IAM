import { IsString, IsNotEmpty, IsEmail, Matches, MinLength, IsDateString, IsPhoneNumber, Length, length, IsNumberString, IsOptional } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()    
    @IsString()
    @IsEmail()
    emailId: string;

    @IsOptional()
    @IsString()
    password: string;

}