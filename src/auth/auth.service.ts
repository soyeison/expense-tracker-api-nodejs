import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

export type PayloadToken = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: PayloadToken = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: SignUpDto) {
    // Revisar que el usuario no exista en la DB
    // Encriptar password
    // Guardar usuario en la DB
    await this.userService.create({ ...payload });
    // Retornar el usuario guardado
    return;
  }
}
