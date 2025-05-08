import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  RolePermissionService,
  PermissionEnum,
  RolePermissionKey,
} from './roles.type';
import { PERMISSION_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(RolePermissionKey)
    public rolePermissionService: RolePermissionService,
    public reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndMerge<PermissionEnum[]>(
      PERMISSION_KEY,
      [context.getClass(), context.getHandler()],
    );
    if (!permissions) {
      return true;
    }
    const needPermission = permissions.join(':');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userPermission = await this.rolePermissionService.queryRolePermission(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      user.uid as number,
    );
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return userPermission.some((role) => needPermission === role);
  }
}
