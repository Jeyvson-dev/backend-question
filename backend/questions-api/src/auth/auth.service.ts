import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {

    const user = await this.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

    const userRequest = await this.validateUser(user.user, user.password);
    if (userRequest) {

      const payload = { name: userRequest.name, id: userRequest.id, email: userRequest.email };

      return {
        access_token: this.jwtService.sign(payload),
      };

    }else{

      throw new UnauthorizedException('Credenciais incorretas');
    }
  }


  async findUser(username: string) {

    try {
      return this.userService.findOneByLogin(username);

    } catch (error) {

      throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
    }
    
  }
}
