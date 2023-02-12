import { deleteCookie, getCookie, setCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { TokensType, TokenResultType, TokenPayload } from "@/modules/authorize/types/tokens-type";
import { AuthorizeCookieOptions, RememberMeOption } from "@/modules/authorize/constants/authorize-save-tokens-options";

export function getTokens(isSSR = false, req = null, res = null): TokenResultType {
  let tokensData;
  let rememberMeData;
  if (isSSR === true) {
    tokensData = getCookie(AuthorizeCookieOptions.key, { req, res });
    rememberMeData = getCookie(RememberMeOption.key, { req, res });
  } else {
    tokensData = getCookie(AuthorizeCookieOptions.key);
    rememberMeData = getCookie(RememberMeOption.key);
  }


  if (!tokensData || rememberMeData === null || rememberMeData === undefined) {
    return null;
  }

  const tokens = JSON.parse(tokensData?.toString()) as TokensType;

  const rememberMe = Boolean(JSON.parse(rememberMeData?.toString()));

  return {
    ...tokens, rememberMe: rememberMe,
  };
}

export function saveTokens(rememberMe: boolean, tokens: TokensType) {
  removeTokens();
  if (rememberMe) {
    setCookie(RememberMeOption.key, rememberMe, {
      maxAge: AuthorizeCookieOptions.maxAge,
    });
    setCookie(AuthorizeCookieOptions.key, tokens, {
      maxAge: AuthorizeCookieOptions.maxAge,
    });
  } else {
    setCookie(RememberMeOption.key, rememberMe);
    setCookie(AuthorizeCookieOptions.key, tokens);
  }
}

export function getTokenPayload(isSSR = false, req = null, res = null): TokenPayload {
  let tokensData;
  if (isSSR === true) {
    tokensData = getCookie(AuthorizeCookieOptions.key, { req, res });
  } else {
    tokensData = getCookie(AuthorizeCookieOptions.key);
  }

  if (!tokensData) {
    return null;
  }
  const tokens = JSON.parse(tokensData?.toString()) as TokensType;

  if (!tokens?.accessToken || !tokens?.refreshToken) {
    return null;
  }

  const decoded = jwt_decode(tokens.accessToken) as TokenPayload;
  if (!decoded?.userId) {
    return null;
  }
  return decoded;
}

export function removeTokens() {
  deleteCookie(AuthorizeCookieOptions.key);
  deleteCookie(RememberMeOption.key);
}
