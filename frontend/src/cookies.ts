import { NextPageContext } from 'next';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Cookies from 'js-cookie';

/* Constants
============================================================================= */
export const AUTH_TOKEN_LOCATION = 'auth-token';
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

/* Auth token
============================================================================= */
/**
 * Gets the Auth token cookie on client.
 */
export function getAuthToken(): string;

/**
 * Gets the Auth token cookie on server.
 * @param ctx Next JS Context
 */
export function getAuthToken(ctx: NextPageContext): string;

export function getAuthToken(ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.get(AUTH_TOKEN_LOCATION);
  } else {
    return parseCookies(ctx)[AUTH_TOKEN_LOCATION];
  }
}

/**
 * Sets the Auth token cookie on client.
 * @param token Auth token
 */
export function setAuthToken(token: string): void;

/**
 * Sets the Auth token cookie on server.
 * @param token Auth token
 * @param ctx Next JS Context
 */
export function setAuthToken(token: string, ctx: NextPageContext): void;

export function setAuthToken(token: string, ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.set(AUTH_TOKEN_LOCATION, token);
  } else {
    return setCookie(ctx, AUTH_TOKEN_LOCATION, token, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
  }
}

/**
 * Removes the Auth token cookie on client.
 */
export function removeAuthToken(): void;

/**
 * Removes the Auth token cookie on server.
 * @param ctx Next JS Context
 */
export function removeAuthToken(ctx: NextPageContext): void;

export function removeAuthToken(ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.remove(AUTH_TOKEN_LOCATION);
  } else {
    return destroyCookie(ctx, AUTH_TOKEN_LOCATION);
  }
}
