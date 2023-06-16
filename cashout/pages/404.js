import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Cashout Plug</title>
      </Head>
      <div className="flex flex-col items-center h-screen bg-slate-800 justify-center gap-5">
        <h1 className="text-red-300 font-bold">404 - Page Not Found</h1>
        <p className="text-emerald-400">
          We&apos;re sorry, the page you requested could not be found.
        </p>
        <div className="border border-slate-600 p-2 px-5 bg-slate-600">
          <Link className="text-emerald-300 hover:text-red-300" href={"/login"}>
            Please click here to login
          </Link>
        </div>
      </div>
    </>
  );
}
