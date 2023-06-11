import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    //: boolean | Promise<boolean> | Observable<boolean>
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  }
}
