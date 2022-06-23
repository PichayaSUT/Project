import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// OK
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
