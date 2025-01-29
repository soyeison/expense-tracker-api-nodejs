import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    if (!user) {
      throw new UnauthorizedException('El usuario no existe');
    }

    // Revisar la contrasena
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload: PayloadToken = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: SignUpDto) {
    // Revisar que el usuario no exista en la DB
    const userExist = await this.userService.findByUsername(payload.username);
    if (userExist) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    // Encriptar password
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(payload.password, salt);
    // Guardar usuario en la DB
    payload.password = passwordHashed;

    const userCreated = await this.userService.create({ ...payload });
    // Retornar el usuario guardado
    console.log('User created: ', userCreated);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userCreated;

    return result;
  }
}
