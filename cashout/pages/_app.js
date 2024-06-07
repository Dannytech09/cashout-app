import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'; 

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
    </Provider>
    </>
  );
}

export default MyApp;
