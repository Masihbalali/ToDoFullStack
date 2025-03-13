import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    // private users: Users[] = [];


    async findAll() {
        return "return find all function from services file"
    }

}
