import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password)

        try {


            // saave the new user in the DB
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    userName: dto.username,
                    hash
                }
            })

            // we can return data without hash
            delete user.hash

            // return the saved user
            return this.signToken(user.id, user.email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken'
                    )
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException(
                'Credential incorrect'
            )
        }

        // compare password
        const pwMatches = await argon.verify(
            user.hash, dto.password
        )

        // if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException(
                'Credential incorrect password is incorrect'
            )
        }

        // delete user hash password before send it back
        delete user.hash

        // send back the user
        return this.signToken(user.id, user.email)
    }


    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const paylaod = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(paylaod, {
            expiresIn: '15min',
            secret: secret
        })

        return {
            access_token: token
        }

    }


    async getMe(user) {
        return user
    }

}
