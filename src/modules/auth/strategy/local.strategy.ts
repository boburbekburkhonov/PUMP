import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: number) {
    const foundUser = await this.authService.validateUsers(username, password);

    if (foundUser.length > 0) {
      throw new UnauthorizedException('User already exists');
    }

    return 'Ok';
  }
}
