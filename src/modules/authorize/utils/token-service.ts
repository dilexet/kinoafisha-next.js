import {
  AuthorizeCookieOptions,
  AuthorizeSessionStorageOptions,
  RememberMeOption,
} from "@/modules/authorize/constants/authorize-save-tokens-options";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { TokenResultType, TokensType } from "@/modules/authorize/types/tokens-type";

export function getTokens(): TokenResultType {
  const rememberMe = Boolean(JSON.parse(localStorage.getItem(RememberMeOption.key)));
  if (rememberMe) {
    const tokens = JSON.parse(getCookie(AuthorizeCookieOptions.key).toString()) as TokensType;
    return {
      ...tokens, rememberMe,
    };
  } else {
    return {
      accessToken: sessionStorage.getItem(AuthorizeSessionStorageOptions.accessKey),
      refreshToken: sessionStorage.getItem(AuthorizeSessionStorageOptions.refreshKey),
      rememberMe: rememberMe,
    };
  }
}

export function saveTokens(rememberMe: boolean, tokens: TokensType) {
  removeTokens();
  localStorage.setItem(RememberMeOption.key, String(rememberMe));
  if (rememberMe) {
    setCookie(AuthorizeCookieOptions.key, tokens, {
      maxAge: AuthorizeCookieOptions.maxAge,
    });
  } else {
    sessionStorage.setItem(AuthorizeSessionStorageOptions.accessKey, tokens.accessToken);
    sessionStorage.setItem(AuthorizeSessionStorageOptions.refreshKey, tokens.refreshToken);
  }
}

export function removeTokens() {
  localStorage.removeItem(RememberMeOption.key);
  sessionStorage.removeItem(AuthorizeSessionStorageOptions.accessKey);
  sessionStorage.removeItem(AuthorizeSessionStorageOptions.refreshKey);
  deleteCookie(AuthorizeCookieOptions.key);
}