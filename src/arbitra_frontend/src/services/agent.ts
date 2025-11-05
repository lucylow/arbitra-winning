import { Actor, HttpAgent, ActorSubclass, type Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import type { IDL } from '@dfinity/candid';

// Canister IDs (will be populated after deployment)
// Fixed: Using import.meta.env for Vite compatibility
export const CANISTER_IDS = {
  arbitra_backend: import.meta.env?.VITE_ARBITRA_BACKEND_CANISTER_ID || '',
  evidence_manager: import.meta.env?.VITE_EVIDENCE_MANAGER_CANISTER_ID || '',
  ai_analysis: import.meta.env?.VITE_AI_ANALYSIS_CANISTER_ID || '',
  bitcoin_escrow: import.meta.env?.VITE_BITCOIN_ESCROW_CANISTER_ID || '',
};

// Log canister IDs for debugging (only in development)
if (typeof window !== 'undefined' && import.meta.env?.DEV) {
  console.log('Loaded canister IDs:', {
    arbitra_backend: CANISTER_IDS.arbitra_backend || '(not set)',
    evidence_manager: CANISTER_IDS.evidence_manager || '(not set)',
    ai_analysis: CANISTER_IDS.ai_analysis || '(not set)',
    bitcoin_escrow: CANISTER_IDS.bitcoin_escrow || '(not set)',
    network: import.meta.env?.VITE_DFX_NETWORK || 'local',
  });
}

// Authentication type
export type AuthType = 'internet-identity' | 'plug';

// Store current auth type
let currentAuthType: AuthType | null = null;

// Create HTTP agent
export const createAgent = async (identity?: Identity) => {
  const agent = new HttpAgent({
    host: import.meta.env?.VITE_DFX_NETWORK === 'ic' 
      ? 'https://ic0.app' 
      : 'http://localhost:4943',
    identity,
  });

  // Fetch root key for local development
  if (import.meta.env?.VITE_DFX_NETWORK !== 'ic') {
    await agent.fetchRootKey().catch(err => {
      console.warn('Unable to fetch root key. Check if the local replica is running');
      console.error(err);
    });
  }

  return agent;
};

// Authentication client (for Internet Identity)
let authClient: AuthClient | null = null;

export const getAuthClient = async () => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
};

// Check if Plug wallet is available
export const isPlugWalletAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.ic?.plug;
};

// Internet Identity login
export const loginWithInternetIdentity = async () => {
  currentAuthType = 'internet-identity';
  const client = await getAuthClient();
  
  const isMainnet = import.meta.env?.VITE_DFX_NETWORK === 'ic';
  
  // Get Internet Identity canister ID with fallback for local development
  // Check both VITE_ prefixed env and direct env access
  // Use correct fallback based on network (mainnet vs local)
  const internetIdentityCanisterId = 
    import.meta.env?.VITE_INTERNET_IDENTITY_CANISTER_ID || 
    import.meta.env?.CANISTER_ID_INTERNET_IDENTITY ||
    (isMainnet ? 'rdmx6-jaaaa-aaaaa-aaadq-cai' : 'ufxgi-4p777-77774-qaadq-cai');
  
  // Get frontend canister ID for redirect
  // Try to extract from current URL first (for local: <canister-id>.localhost:4943)
  let frontendCanisterId = 
    import.meta.env?.VITE_ARBITRA_FRONTEND_CANISTER_ID ||
    import.meta.env?.CANISTER_ID_ARBITRA_FRONTEND ||
    '';
  
  // Try to extract from current URL if not in env
  let isUsingSubdomain = false;
  if (!frontendCanisterId && typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const url = window.location.href;
    
    // Check if using canister subdomain format: <canister-id>.localhost
    const canisterMatch = hostname.match(/^([a-z0-9-]+)\.localhost$/);
    if (canisterMatch) {
      frontendCanisterId = canisterMatch[1];
      isUsingSubdomain = true;
    } else if (hostname === 'localhost') {
      // Check URL params for canisterId
      const urlParams = new URLSearchParams(window.location.search);
      const canisterIdParam = urlParams.get('canisterId');
      if (canisterIdParam) {
        frontendCanisterId = canisterIdParam;
        isUsingSubdomain = false;
      }
    }
  }
  
  // For local development, use the local Internet Identity canister
  // The URL format for local Internet Identity should include the canister ID
  let identityProvider: string;
  let derivationOrigin: string | undefined;
  
  if (isMainnet) {
    identityProvider = 'https://identity.ic0.app';
    // For mainnet, use the frontend canister URL if available
    if (frontendCanisterId) {
      derivationOrigin = `https://${frontendCanisterId}.ic0.app`;
    } else if (typeof window !== 'undefined') {
      // Fallback to current origin
      derivationOrigin = window.location.origin;
    }
  } else {
    // For local development, use the canister ID in the URL
    // Format: http://localhost:4943?canisterId=<canister-id>
    identityProvider = `http://localhost:4943?canisterId=${internetIdentityCanisterId}`;
    
    // Set derivation origin to match how the user is accessing the app
    if (frontendCanisterId && typeof window !== 'undefined') {
      if (isUsingSubdomain) {
        // User is accessing via subdomain format
        derivationOrigin = `http://${frontendCanisterId}.localhost:4943`;
      } else {
        // User is accessing via query param format
        derivationOrigin = `http://localhost:4943?canisterId=${frontendCanisterId}`;
      }
    } else if (typeof window !== 'undefined') {
      // Fallback: use current window location (preserving query params if any)
      derivationOrigin = window.location.origin + window.location.search;
    }
  }
  
  return new Promise<void>((resolve, reject) => {
    try {
      client.login({
        identityProvider,
        derivationOrigin,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
        onSuccess: () => {
          // After successful login, Internet Identity should redirect back automatically
          // The AuthClient handles the redirect via derivationOrigin
          console.log('Internet Identity login successful');
          console.log('Derivation origin:', derivationOrigin);
          console.log('Current location:', typeof window !== 'undefined' ? window.location.href : 'N/A');
          
          // The redirect should happen automatically via AuthClient
          // If we're still here (which shouldn't happen), the redirect will occur
          // Don't reload immediately as AuthClient manages the redirect
          resolve();
        },
      onError: (error) => {
        console.error('Internet Identity login error:', error);
        console.error('Network:', isMainnet ? 'mainnet' : 'local');
        console.error('Internet Identity canister ID:', internetIdentityCanisterId);
        console.error('Identity provider URL:', identityProvider);
        console.error('Derivation origin:', derivationOrigin);
        console.error('Frontend canister ID:', frontendCanisterId);
        console.error('Current URL:', typeof window !== 'undefined' ? window.location.href : 'N/A');
        
        // Provide more helpful error messages
        let errorMessage = 'Login failed';
        const errorAny = error as any;
        if (errorAny instanceof Error) {
          errorMessage = errorAny.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        } else if (error && typeof error === 'object') {
          const errorObj = error as Record<string, unknown>;
          if ('message' in errorObj && typeof errorObj.message === 'string') {
            errorMessage = errorObj.message;
          } else if (typeof errorObj.toString === 'function') {
            errorMessage = errorObj.toString();
          }
        }
        
        // Create a more descriptive error
        const descriptiveError = new Error(
          `Internet Identity login failed: ${errorMessage}. ` +
          `Please check that you're accessing the app from the correct URL and that Internet Identity is available.`
        );
        reject(descriptiveError);
      },
      });
    } catch (error) {
      console.error('Exception during Internet Identity login setup:', error);
      const setupError = error instanceof Error 
        ? error 
        : new Error(`Failed to initiate login: ${String(error)}`);
      reject(setupError);
    }
  });
};

// Plug wallet login
export const loginWithPlug = async () => {
  if (!isPlugWalletAvailable()) {
    throw new Error('Plug wallet is not installed. Please install it from https://plugwallet.ooo/');
  }

  try {
    currentAuthType = 'plug';
    const plug = window.ic!.plug!;
    
    // Get all canister IDs for whitelist
    const whitelist = Object.values(CANISTER_IDS).filter(id => id !== '');
    
    // Request connection
    const connected = await plug.requestConnect({
      whitelist: whitelist.length > 0 ? whitelist : undefined,
    });

    if (!connected) {
      throw new Error('Failed to connect to Plug wallet');
    }

    // Verify connection
    const isConnected = await plug.isConnected();
    if (!isConnected) {
      throw new Error('Plug wallet connection verification failed');
    }
  } catch (error) {
    console.error('Plug wallet login error:', error);
    currentAuthType = null;
    throw error;
  }
};

// Generic login function (maintains backward compatibility)
export const login = async (authType: AuthType = 'internet-identity') => {
  if (authType === 'plug') {
    await loginWithPlug();
  } else {
    await loginWithInternetIdentity();
  }
};

export const logout = async () => {
  if (currentAuthType === 'plug' && isPlugWalletAvailable()) {
    try {
      await window.ic!.plug!.requestDisconnect();
    } catch (error) {
      console.error('Plug wallet logout error:', error);
    }
  } else {
    const client = await getAuthClient();
    await client.logout();
  }
  
  currentAuthType = null;
  window.location.reload();
};

export const isAuthenticated = async () => {
  // Check Plug wallet first if available and connected
  if (isPlugWalletAvailable()) {
    try {
      const plug = window.ic!.plug!;
      const isPlugConnected = await plug.isConnected();
      if (isPlugConnected) {
        currentAuthType = 'plug';
        return true;
      }
    } catch (error) {
      console.error('Plug wallet authentication check error:', error);
    }
  }
  
  // Check Internet Identity
  const client = await getAuthClient();
  const isIIConnected = await client.isAuthenticated();
  if (isIIConnected) {
    currentAuthType = 'internet-identity';
    return true;
  }
  
  return false;
};

export const getIdentity = async () => {
  // Check Plug wallet first if available and connected
  if (isPlugWalletAvailable()) {
    try {
      const plug = window.ic!.plug!;
      const isConnected = await plug.isConnected();
      if (isConnected) {
        currentAuthType = 'plug';
        // Get identity from Plug's agent
        return plug.agent.getIdentity();
      }
    } catch (error) {
      console.error('Error getting identity from Plug:', error);
    }
  }
  
  // Fall back to Internet Identity
  const client = await getAuthClient();
  return client.getIdentity();
};

export const getPrincipal = async (): Promise<Principal | null> => {
  // Check Plug wallet first if available and connected
  if (isPlugWalletAvailable()) {
    try {
      const plug = window.ic!.plug!;
      const isConnected = await plug.isConnected();
      if (isConnected) {
        currentAuthType = 'plug';
        const principalString = await plug.getPrincipal();
        return Principal.fromText(principalString);
      }
    } catch (error) {
      console.error('Error getting principal from Plug:', error);
    }
  }
  
  // Fall back to Internet Identity
  try {
    const identity = await getIdentity();
    return identity.getPrincipal();
  } catch (error) {
    console.error('Error getting principal from Internet Identity:', error);
    return null;
  }
};

// Create actor for canister interaction
export const createActor = async <T = ActorSubclass<Record<string, IDL.ServiceClass>>>(
  canisterId: string, 
  idlFactory: IDL.InterfaceFactory | ((args: { IDL: typeof IDL }) => IDL.ServiceClass)
): Promise<T> => {
  // Validate canister ID
  if (!canisterId || canisterId.trim() === '') {
    throw new Error(
      'Canister ID is not set. Please ensure the canister is deployed and environment variables are configured correctly. ' +
      'Check your .env file or run "dfx deploy" to generate canister IDs.'
    );
  }

  // Check if Plug wallet is available and connected
  if (isPlugWalletAvailable()) {
    try {
      const plug = window.ic!.plug!;
      const isConnected = await plug.isConnected();
      if (isConnected) {
        currentAuthType = 'plug';
        
        // Handle both InterfaceFactory and factory function patterns
        const factory = typeof idlFactory === 'function' && idlFactory.length === 1
          ? idlFactory
          : idlFactory;
        
        return await plug.createActor<T>({
          canisterId,
          interfaceFactory: factory as IDL.InterfaceFactory,
        });
      }
    } catch (error) {
      console.error('Error creating actor with Plug wallet:', error);
      // Fall through to standard agent approach
    }
  }
  
  // Use standard agent approach (Internet Identity or fallback)
  const identity = await getIdentity();
  const agent = await createAgent(identity);
  
  // Handle both InterfaceFactory and factory function patterns
  const factory = typeof idlFactory === 'function' && idlFactory.length === 1
    ? idlFactory
    : idlFactory;
  
  return Actor.createActor(factory as IDL.InterfaceFactory, {
    agent,
    canisterId,
  }) as T;
};
