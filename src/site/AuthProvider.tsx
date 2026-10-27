import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  AUTH_EVENT,
  createStoredAccount,
  getCurrentAccount,
  signInToAccount,
  signOutOfAccount,
  updateStoredPlan,
  updateStoredProfile,
  type BillingPeriod,
  type CreateAccountInput,
  type FieldAccount,
  type UpdateProfileInput,
} from './auth';

interface AuthContextValue {
  account: FieldAccount | null;
  createAccount: (input: CreateAccountInput) => Promise<FieldAccount>;
  signIn: (email: string, password: string) => Promise<FieldAccount>;
  signOut: () => void;
  updateProfile: (input: UpdateProfileInput) => Promise<FieldAccount>;
  changePlan: (plan: string, billing: BillingPeriod) => Promise<FieldAccount>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<FieldAccount | null>(() => getCurrentAccount());

  useEffect(() => {
    const sync = () => setAccount(getCurrentAccount());
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.startsWith('lithos.')) sync();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(AUTH_EVENT, sync);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  const createAccount = useCallback(async (input: CreateAccountInput) => {
    const nextAccount = await createStoredAccount(input);
    setAccount(nextAccount);
    return nextAccount;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const nextAccount = await signInToAccount(email, password);
    setAccount(nextAccount);
    return nextAccount;
  }, []);

  const signOut = useCallback(() => {
    signOutOfAccount();
    setAccount(null);
  }, []);

  const updateProfile = useCallback(async (input: UpdateProfileInput) => {
    const nextAccount = updateStoredProfile(input);
    setAccount(nextAccount);
    return nextAccount;
  }, []);

  const changePlan = useCallback(async (plan: string, billing: BillingPeriod) => {
    const nextAccount = updateStoredPlan(plan, billing);
    setAccount(nextAccount);
    return nextAccount;
  }, []);

  const value = useMemo(
    () => ({ account, createAccount, signIn, signOut, updateProfile, changePlan }),
    [account, createAccount, signIn, signOut, updateProfile, changePlan],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
