import '@material-tailwind/react/tailwind.css';
import 'tailwindcss/tailwind.css';
import Header from 'next/head';
import {Provider} from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
