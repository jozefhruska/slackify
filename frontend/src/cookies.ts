import { NextPageContext } from 'next';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Cookies from 'js-cookie';
import { ColorScheme } from './types/common';

/* Constants
============================================================================= */
export const AUTH_TOKEN_LOCATION = 'auth-token';
export const COLOR_SCHEME_LOCATION = 'color-scheme';
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

/* Color scheme
============================================================================= */
/**
 * Gets the color scheme cookie on client.
 */
export function getColorScheme(): ColorScheme;

/**
 * Gets the color scheme cookie on server.
 * @param ctx Next JS Context
 */
export function getColorScheme(ctx: NextPageContext): ColorScheme;

export function getColorScheme(ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.get(COLOR_SCHEME_LOCATION) || 'dark';
  } else {
    return parseCookies(ctx)[COLOR_SCHEME_LOCATION] || 'dark';
  }
}

/**
 * Sets the color scheme cookie on client.
 * @param token Color scheme
 */
export function setColorScheme(scheme: ColorScheme): void;

/**
 * Sets the color scheme cookie on server.
 * @param token Color scheme
 * @param ctx Next JS Context
 */
export function setColorScheme(scheme: ColorScheme, ctx: NextPageContext): void;

export function setColorScheme(scheme: ColorScheme, ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.set(COLOR_SCHEME_LOCATION, scheme);
  } else {
    return setCookie(ctx, COLOR_SCHEME_LOCATION, scheme, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
  }
}

/**
 * Removes the color scheme cookie on client.
 */
export function removeColorScheme(): void;

/**
 * Removes the color scheme cookie on server.
 * @param ctx Next JS Context
 */
export function removeColorScheme(ctx: NextPageContext): void;

export function removeColorScheme(ctx?: NextPageContext) {
  if (ctx === undefined) {
    return Cookies.remove(COLOR_SCHEME_LOCATION);
  } else {
    return destroyCookie(ctx, COLOR_SCHEME_LOCATION);
  }
}
