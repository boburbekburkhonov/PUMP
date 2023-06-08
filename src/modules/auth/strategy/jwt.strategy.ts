import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomRequest } from 'src/types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1q2w3e4r',
      passReqToCallback: true,
      pass: true,
    });
  }

  validate(req: CustomRequest, payload: string): string {
    req.userId = payload;
    return 'Ok';
  }
}
