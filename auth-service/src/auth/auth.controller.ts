import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() data: AuthDto) {
        return this.authService.register(data);
    }

    @Post('login')
    login(@Body() data: any) {
        return this.authService.login(data);
    }
}
