import React from "react";
import Router from "next/router";

// Prevent..
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const pageProps = {
        example: "This is an example value",
      };
      const wrappedProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...pageProps, ...wrappedProps };
    }

    componentDidMount() {
      if (typeof window !== "undefined") {
        const isAuthenticated = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));
        const isAdmin = user && user.isAdmin;
        const currentPath = window.location.pathname;

        if (
          !isAuthenticated &&
          currentPath !== "/login" &&
          currentPath !== "/admin-wonders/login"
        ) {
          Router.push("/login");
        } else if (isAdmin !== true && currentPath.startsWith("/admin-wonders")) {
          Router.push("/admin-wonders/login");
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
