import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('email/:email')
    findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.usersService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.usersService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Patch(':id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.usersService.deactivate(id);
    }

    @Patch(':id/activate')
    activate(@Param('id') id: string) {
        return this.usersService.activate(id);
    }
}
