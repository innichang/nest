import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePasswords } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const result = await comparePasswords(password, userDB.password);
      if (result) {
        const payload = { sub: userDB.id, username: userDB.username };

        return await this.jwtService.signAsync(payload);
      }
    } else {
      throw new UnauthorizedException('Invalid Entry');
    }
  }
}
