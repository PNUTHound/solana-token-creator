import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";
import Notifications from "../components/Notification";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Head>
          <title>MGF DEV - Solana Token Creator</title>
          <meta name="description" content="Create Solana tokens without code. Professional token creation platform by MGF DEV." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ContextProvider>
          <Notifications />
          <AppBar />
          <main className="pt-20">
            <Component {...pageProps} />
          </main>
          <Footer />
        </ContextProvider>

        <script src="assets/libs/preline/preline.js"></script>
        <script src="assets/libs/swiper/swiper-bundle.min.js"></script>
        <script src="assets/libs/gumshoejs/gumshoe.polyfills.min.js"></script>
        <script src="assets/libs/lucide/umd/lucide.min.js"></script>
        <script src="assets/libs/aos/aos.js"></script>
        <script src="assets/js/swiper.js"></script>
        <script src="assets/js/theme.js"></script>
      </div>
    </ThemeProvider>
  );
};

export default App;