import { UserRole } from '@prisma/client';

/**
 * Checks if user can manage (publish, delete, ...) collections.
 * @param role User role
 */
export const canManageCollections = (role: UserRole) => {
  const allowedRoles: UserRole[] = [UserRole.OWNER, UserRole.EDITOR];

  return allowedRoles.includes(role);
};

/**
 * Checks if user can create and edit collections.
 * @param role User role
 */
export const canCreateCollections = (role: UserRole) => {
  const allowedRoles: UserRole[] = [UserRole.OWNER, UserRole.EDITOR, UserRole.AUTHOR];

  return allowedRoles.includes(role);
};

export const canManageComponents = canManageCollections;
export const canCreateComponents = canCreateCollections;
