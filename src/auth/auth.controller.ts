import { Body, Controller, Post, Get, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(200) // we can send custom http code or even HttpStatus.ACCEPTED messages
    @Post("signup")
    signup(@Body() dto: AuthDto) {
        // console.log({
        //     dto,
        // })
        return this.authService.signup(dto)
    }


    @Post("signin")
    signin(@Body() dto: AuthDto) {

        return this.authService.signin(dto)
    }

    @UseGuards(JwtGuard) // Guard is an protection if there is no jwt token exists or its wrng throw error
    @Get("me")
    getMe(@GetUser() user: User) {
        return this.authService.getMe(user)
    }



}
