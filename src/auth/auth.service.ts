import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signin() {
        return "sign in from auth service"
    }

    signup() {
        return "sign UP from auth service"
    }

}
