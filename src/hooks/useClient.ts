import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const useClient = () => {
  const [providerToken, setProviderToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const session = await supabase.auth.getSession();
      if (session)
        setProviderToken(session.data.session?.provider_token as string);
    };
    getToken();
  }, []);
  return providerToken;
};
export default useClient;
