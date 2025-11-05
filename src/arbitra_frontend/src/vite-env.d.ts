/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ARBITRA_BACKEND_CANISTER_ID?: string;
  readonly VITE_EVIDENCE_MANAGER_CANISTER_ID?: string;
  readonly VITE_AI_ANALYSIS_CANISTER_ID?: string;
  readonly VITE_BITCOIN_ESCROW_CANISTER_ID?: string;
  readonly VITE_ARBITRA_FRONTEND_CANISTER_ID?: string;
  readonly VITE_DFX_NETWORK?: string;
  readonly VITE_INTERNET_IDENTITY_CANISTER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Plug Wallet types
interface PlugProvider {
  requestConnect: (config?: { whitelist?: string[] }) => Promise<boolean>;
  requestDisconnect: () => Promise<void>;
  createActor: <T>(config: {
    canisterId: string;
    interfaceFactory: any;
  }) => Promise<T>;
  getPrincipal: () => Promise<string>;
  isConnected: () => Promise<boolean>;
  agent: any;
}

interface Window {
  ic?: {
    plug?: PlugProvider;
  };
}
