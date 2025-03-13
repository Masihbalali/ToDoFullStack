import { isEmail, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

}