import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from './roles.type';

export const PERMISSION_KEY = 'Permission';
export const Permission = (...roles: PermissionEnum[] | string[]) =>
  SetMetadata(PERMISSION_KEY, roles);

export const PermissionCreate = () =>
  SetMetadata(PERMISSION_KEY, [PermissionEnum.Create]);

export const PermissionUpdate = () =>
  SetMetadata(PERMISSION_KEY, [PermissionEnum.Update]);
export const PermissionQuery = () =>
  SetMetadata(PERMISSION_KEY, [PermissionEnum.Query]);
export const PermissionDelete = () =>
  SetMetadata(PERMISSION_KEY, [PermissionEnum.Delete]);
