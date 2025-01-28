import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
