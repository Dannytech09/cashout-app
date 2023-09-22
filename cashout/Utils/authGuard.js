import { useEffect } from "react";
import { getUser, removeUserSession } from "./Common";
import {
  aExpireSessionAndRedirect,
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "./authCookies";

// error aborting errors using router inappropriately
export async function authGuard(ctx, router) {
  const user = getUser();
  const id = user ? user.id : null;
  const { token } = getUserIdAndToken(ctx);

  useEffect(() => {
    if (!id || !token) {
      // console.log("effect ran")
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
    }
  }, [id, token]);
}

export async function adminAuthGuard(ctx, router) {
  const user = getUser();
  const id = user ? user.id : null;
  const { token } = getUserIdAndToken(ctx);

  useEffect(() => {
    if (!id || !token) {
      // console.log("effect ran")
      removeUserSession();
      aExpireSessionAndRedirect(ctx, router);
    }
  }, [id, token]);
}
