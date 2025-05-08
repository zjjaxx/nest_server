export interface RolePermissionService {
  queryRolePermission(uid: number): Promise<unknown[]>;
}

export enum PermissionEnum {
  Create = 'Create',
  Update = 'Update',
  Query = 'Query',
  Delete = 'Delete',
}

export const RolePermissionKey = '__RolePermissionKey__';
