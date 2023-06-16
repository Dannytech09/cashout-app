import { useRouter } from "next/router";

const useAuthGuard = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const token = window.sessionStorage.getItem("token");
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const isAdmin = user && user.isAdmin;

   if (token && isAdmin) {
      router.push("/admin/dashboard");
    } else if (token && router.pathname === "/login") {
      router.push("/user/dashboard");
    }
  }
};

export default useAuthGuard;
