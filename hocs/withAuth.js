 import React from "react";
 import Router from "next/router";

 // Prevent unauthenticated users from accessing the dashboard
const withAuth = (WrappedComponent) => {
   return class extends React.Component {
     static async getInitialProps(ctx) {
       const pageProps =
         WrappedComponent.getInitialProps &&
         (await WrappedComponent.getInitialProps(ctx));
       return { ...pageProps };
     }

     componentDidMount() {
       if (typeof window !== "undefined") {
         const isAuthenticated = sessionStorage.getItem("token");
         const user = JSON.parse(sessionStorage.getItem("user"));
         const isAdmin = user && user.isAdmin;
         const currentPath = window.location.pathname;
       
         if (!isAuthenticated && currentPath !== "/login" && currentPath !== "/admin/login") {
           Router.push("/login");
         } else if (isAdmin !== true && currentPath.startsWith("/admin")) {
           Router.push("/admin/login");
         }
       }
    }

     render() {
       return <WrappedComponent {...this.props} />;
     }
   };
 };

 export default withAuth;