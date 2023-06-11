import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/utils/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    const {
      body: { username, password },
    } = req;
    const accessToken = await this.authService.validateUser(username, password);
    return { access_token: accessToken };
  }
}
