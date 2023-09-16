import { useEffect } from "react";
import { getUser, removeUserSession } from "./Common";
import { aExpireSessionAndRedirect, expireSessionAndRedirect, getUserIdAndToken } from "./authCookies";

// error aborting errors using router inappropriately
export async function authGuard(ctx, router) {
    const userId = getUser();
    const { token } = getUserIdAndToken(ctx);
  
    useEffect(() => {
      if (!userId || !token) {
        // console.log("effect ran")
        removeUserSession();
        expireSessionAndRedirect(ctx, router)
      }
    }, [userId, token])
}

export async function adminAuthGuard(ctx, router) {
    const userId = getUser();
    const { token } = getUserIdAndToken(ctx);
  
    useEffect(() => {
      if (!userId || !token) {
        // console.log("effect ran")
        removeUserSession();
        aExpireSessionAndRedirect(ctx, router)
      }
    }, [userId, token])
}