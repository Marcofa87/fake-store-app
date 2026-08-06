export const AUTH_TOKEN_COOKIE = "fs_token";
export const AUTH_USERNAME_COOKIE = "fs_username";

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24;

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE,
} as const;
