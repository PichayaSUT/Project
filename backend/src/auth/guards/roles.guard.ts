import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee/employee.service';
import { MODULES_KEY } from '../decorators/modules.decorator';
import { ModulesAllowed } from './../models/role.enum';
// import { Observable } from 'rxjs';
// import { User } from 'src/user/models/user.interface';
// import { map } from 'rxjs/operators';
// import { hasRoles } from '../decorators/roles.decorator';

// OK ยังไม่ต้องใช้
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject(forwardRef(() => EmployeeService))
    private userService: EmployeeService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // เปลี่ยนชื่อตัวแปร
    const roles = this.reflector.getAllAndOverride<ModulesAllowed[]>(
      MODULES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // user
    // context.switchToHttp().getRequest()
    if (roles.length === 0) return false;
    console.log('roles', !roles);
    // return false;
    // TODO :check authorization
    return true;
  }

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //   if (!roles) {
  //     return true;
  //   }

  //   const request = context.switchToHttp().getRequest();
  //   const user: User = request.user;

  //   return this.userService.findOne(user.id).pipe(
  //     map((user: User) => {
  //       const hasRole = () => roles.indexOf(user.role) > -1;
  //       let hasPermission: boolean = false;

  //       if (hasRole()) {
  //         hasPermission = true;
  //       }
  //       return user && hasPermission;
  //     }),
  //   );
  // }
}
