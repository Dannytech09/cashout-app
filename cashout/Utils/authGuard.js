import { useEffect } from "react";
import { getUser, removeUserSession } from "./Common";
import { expireSessionAndRedirect, getUserIdAndToken } from "./authCookies";
import { useRouter } from "next/router";

export async function authGuard(ctx) {
    const router = useRouter();
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