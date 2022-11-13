import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";

import "../styles/globals.css";

import { lightTheme } from "../themes";
import { AuthProvider, CartProvider, UiProvider } from "context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider >
    <SWRConfig
      value={{
        // refreshInterval: 300,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>

    </SessionProvider>
  );
}

export default MyApp;
