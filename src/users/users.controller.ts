import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get('new')
    findAllNew() {
        return 'all users new with route /new'
    }

    @Get()
    findBySort(@Query() sort: "a" | "b" = "b") {
        console.log(sort)
        return 'all users by sort'
    }

    @Get(':id')
    findOne(@Param() id: string) {
        console.log(id)
        return `get method by user id ${id}`
    }

    @Post()
    create() {
        return 'create user'
    }

    @Post()
    createBody(@Body() input: any) {
        console.log(input)
        return 'create user by body'
    }

}
