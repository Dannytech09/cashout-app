import "../styles/globals.css";
// import Layout from '../components/Layout'
// import Loader from "../components/utils/Loader";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Loader /> */}
      <Component {...pageProps} />
    </>
  );
}

export default (MyApp);
