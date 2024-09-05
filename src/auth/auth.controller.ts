import { Controller, Request, Post, Get, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Request() req) {

        try {
            return this.authService.login(req.body);

        } catch (error) {

            throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('validate-token')
    async validateToken(@Request() req){
        return true
    }
    
}
