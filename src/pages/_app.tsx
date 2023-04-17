import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SUPABASE_ANON_KEY, SUPABSE_URL } from "@/lib/supabase";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: SUPABSE_URL,
      supabaseKey: SUPABASE_ANON_KEY,
    })
  );
  return (
    <RecoilRoot>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
    </RecoilRoot>
  );
}
