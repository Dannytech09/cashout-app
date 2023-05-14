import React from "react";
import Head from "next/head";
import Link from "next/link";

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <>
        <Head>
          <title>Error {statusCode} | Cashout Plug</title>
        </Head>
        <div className="flex flex-col items-center h-screen bg-slate-800 justify-center gap-5">
          <h1 className="text-red-300 font-bold">{statusCode} Error</h1>
          <p className="text-emerald-400">
            We&apos;re sorry, an error occurred on the server.
          </p>
          <div className="border border-slate-600 p-2 px-5 bg-slate-600">
            <Link
              className="text-emerald-300 hover:text-red-300"
              href={"/login"}
            >
              Please click here to login
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorPage;
