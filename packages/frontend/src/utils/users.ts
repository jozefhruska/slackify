import { UserRole } from '../types/generated/graphql';

/**
 * Checks if user can manage (publish, delete, ...) collections.
 * @param role User role
 */
export const canManageCollections = (role: UserRole) => {
  const allowedRoles: UserRole[] = [UserRole.Owner, UserRole.Editor];

  return allowedRoles.includes(role);
};

/**
 * Checks if user can create and edit collections.
 * @param role User role
 */
export const canCreateCollections = (role: UserRole) => {
  const allowedRoles: UserRole[] = [UserRole.Owner, UserRole.Editor, UserRole.Author];

  return allowedRoles.includes(role);
};

export const canManageComponents = canManageCollections;
export const canCreateComponents = canCreateCollections;

/**
 * Checks if user can manage other users.
 * @param role User role
 */
export const canManageUsers = (role: UserRole) => {
  const allowedRoles: UserRole[] = [UserRole.Owner];

  return allowedRoles.includes(role);
};
