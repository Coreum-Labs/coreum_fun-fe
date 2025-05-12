import React, { createContext, useContext, useEffect, useState } from "react";
import { Client } from "coreum-js-nightly";

interface CoreumContextType {
  client: Client | null;
}

const CoreumContext = createContext<CoreumContextType>({ client: null });

export const useCoreum = () => useContext(CoreumContext);

export const CoreumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const coreum = new Client({
          network: "testnet",
          custom_node_endpoint: "https://coreum-testnet-rpc.ibs.team",
        });
        await coreum.connect({ withWS: true });
        setClient(coreum);
      } catch (error) {
        console.error("Failed to initialize Coreum client:", error);
      }
    };

    initClient();
  }, []);

  return (
    <CoreumContext.Provider value={{ client }}>
      {children}
    </CoreumContext.Provider>
  );
};
