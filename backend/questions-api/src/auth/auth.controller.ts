import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }
    @UseGuards(JwtAuthGuard)
    @Get('teste')
    getTeste(){
        return 'teste';
    }
}
