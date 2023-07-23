import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
// import Layout from '../components/Layout'
// import Loader from "../components/utils/Loader";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Loader /> */}
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
