const ACCOUNTS_KEY = 'lithos.accounts.v1';
const SESSION_KEY = 'lithos.session.v1';
const PASSWORD_ITERATIONS = 150_000;

export const AUTH_EVENT = 'lithos:auth-change';
export const NICKNAME_MAX_LENGTH = 24;

export type BillingPeriod = 'monthly' | 'annual';

export interface FieldAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  billing: BillingPeriod;
  createdAt: string;
  nickname?: string;
  avatar?: string;
}

export interface CreateAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  plan: string;
  billing: BillingPeriod;
}

export interface UpdateProfileInput {
  nickname: string;
  avatar?: string | null;
}

interface StoredAccount extends FieldAccount {
  passwordHash: string;
  passwordSalt: string;
  passwordIterations: number;
}

type AuthErrorCode =
  | 'email-taken'
  | 'invalid-credentials'
  | 'weak-password'
  | 'unsupported'
  | 'invalid-profile'
  | 'invalid-plan'
  | 'storage';

export class AuthError extends Error {
  code: AuthErrorCode;

  constructor(message: string, code: AuthErrorCode) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

function hasStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isStoredAccount(value: unknown): value is StoredAccount {
  if (!value || typeof value !== 'object') return false;
  const account = value as Partial<StoredAccount>;
  return (
    typeof account.id === 'string' &&
    typeof account.firstName === 'string' &&
    typeof account.lastName === 'string' &&
    typeof account.email === 'string' &&
    typeof account.plan === 'string' &&
    (account.billing === 'monthly' || account.billing === 'annual') &&
    typeof account.createdAt === 'string' &&
    typeof account.passwordHash === 'string' &&
    typeof account.passwordSalt === 'string' &&
    typeof account.passwordIterations === 'number' &&
    (account.nickname === undefined || typeof account.nickname === 'string') &&
    (account.avatar === undefined || typeof account.avatar === 'string')
  );
}

function readAccounts(): StoredAccount[] {
  if (!hasStorage()) return [];

  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredAccount) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  if (!hasStorage()) {
    throw new AuthError('Accounts are unavailable in this browser.', 'storage');
  }

  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    throw new AuthError(
      'This browser could not save the field record. Check that site storage is enabled.',
      'storage',
    );
  }
}

function toFieldAccount(account: StoredAccount): FieldAccount {
  return {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    plan: account.plan,
    billing: account.billing,
    createdAt: account.createdAt,
    nickname: account.nickname,
    avatar: account.avatar,
  };
}

function notifyAuthChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function normaliseEmail(value: string) {
  return value.trim().toLowerCase();
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return window.btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function createAccountId(accounts: StoredAccount[]) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(4));
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    const id = `LTH-${hex.slice(0, 4)}-${hex.slice(4)}`.toUpperCase();
    if (!accounts.some((account) => account.id === id)) return id;
  }

  return `LTH-${Date.now().toString(36).toUpperCase()}`;
}

async function derivePasswordHash(password: string, salt: Uint8Array, iterations: number) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new AuthError(
      'Account creation needs a secure browser context (HTTPS or localhost).',
      'unsupported',
    );
  }

  const keyMaterial = await subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const bits = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  );

  return bytesToBase64(new Uint8Array(bits));
}

export async function createStoredAccount(input: CreateAccountInput): Promise<FieldAccount> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = normaliseEmail(input.email);

  if (input.password.length < 8) {
    throw new AuthError('Your password needs at least 8 characters.', 'weak-password');
  }

  if (!globalThis.crypto?.getRandomValues) {
    throw new AuthError(
      'Account creation needs a secure browser context (HTTPS or localhost).',
      'unsupported',
    );
  }

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === email)) {
    throw new AuthError(
      'A field record already exists for this email. Sign in instead.',
      'email-taken',
    );
  }

  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const passwordHash = await derivePasswordHash(input.password, salt, PASSWORD_ITERATIONS);

  const account: StoredAccount = {
    id: createAccountId(accounts),
    firstName,
    lastName,
    email,
    plan: input.plan,
    billing: input.billing,
    createdAt: new Date().toISOString(),
    passwordHash,
    passwordSalt: bytesToBase64(salt),
    passwordIterations: PASSWORD_ITERATIONS,
  };

  writeAccounts([...accounts, account]);
  window.localStorage.setItem(SESSION_KEY, account.id);
  notifyAuthChanged();

  return toFieldAccount(account);
}

export async function signInToAccount(emailInput: string, password: string): Promise<FieldAccount> {
  const email = normaliseEmail(emailInput);
  const accounts = readAccounts();
  const account = accounts.find((item) => item.email === email);

  if (!account) {
    throw new AuthError('We could not find a field record for that email.', 'invalid-credentials');
  }

  const passwordHash = await derivePasswordHash(
    password,
    base64ToBytes(account.passwordSalt),
    account.passwordIterations,
  );

  if (passwordHash !== account.passwordHash) {
    throw new AuthError('That password does not match this field record.', 'invalid-credentials');
  }

  try {
    window.localStorage.setItem(SESSION_KEY, account.id);
  } catch {
    throw new AuthError('This browser could not open the field record.', 'storage');
  }

  notifyAuthChanged();
  return toFieldAccount(account);
}

export function signOutOfAccount() {
  if (hasStorage()) {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // The session will still be cleared from the in-memory auth state.
    }
  }
  notifyAuthChanged();
}

export function updateStoredProfile(input: UpdateProfileInput): FieldAccount {
  if (!hasStorage()) {
    throw new AuthError('Accounts are unavailable in this browser.', 'storage');
  }

  const nickname = input.nickname.trim().replace(/\s+/g, ' ');
  if (nickname.length > NICKNAME_MAX_LENGTH) {
    throw new AuthError(
      `Keep your nickname to ${NICKNAME_MAX_LENGTH} characters or fewer.`,
      'invalid-profile',
    );
  }

  if (
    input.avatar !== undefined &&
    input.avatar !== null &&
    (!input.avatar.startsWith('data:image/') || input.avatar.length > 1_500_000)
  ) {
    throw new AuthError('That profile picture could not be saved. Try a smaller image.', 'invalid-profile');
  }

  const accountId = window.localStorage.getItem(SESSION_KEY);
  if (!accountId) {
    throw new AuthError('Sign in again to update your profile.', 'invalid-credentials');
  }

  const accounts = readAccounts();
  const index = accounts.findIndex((account) => account.id === accountId);
  if (index === -1) {
    throw new AuthError('We could not find that field record. Sign in again.', 'invalid-credentials');
  }

  const nextAccount: StoredAccount = { ...accounts[index] };

  if (nickname) nextAccount.nickname = nickname;
  else delete nextAccount.nickname;

  if (input.avatar) nextAccount.avatar = input.avatar;
  else delete nextAccount.avatar;

  accounts[index] = nextAccount;
  writeAccounts(accounts);
  notifyAuthChanged();

  return toFieldAccount(nextAccount);
}

export function updateStoredPlan(planInput: string, billing: BillingPeriod): FieldAccount {
  if (!hasStorage()) {
    throw new AuthError('Accounts are unavailable in this browser.', 'storage');
  }

  const plan = planInput.trim();
  if (!plan) {
    throw new AuthError('Choose a plan first.', 'invalid-plan');
  }

  if (billing !== 'monthly' && billing !== 'annual') {
    throw new AuthError('Choose a billing period first.', 'invalid-plan');
  }

  const accountId = window.localStorage.getItem(SESSION_KEY);
  if (!accountId) {
    throw new AuthError('Sign in again to change your plan.', 'invalid-credentials');
  }

  const accounts = readAccounts();
  const index = accounts.findIndex((account) => account.id === accountId);
  if (index === -1) {
    throw new AuthError('We could not find that field record. Sign in again.', 'invalid-credentials');
  }

  const nextAccount: StoredAccount = {
    ...accounts[index],
    plan,
    billing,
  };

  accounts[index] = nextAccount;
  writeAccounts(accounts);
  notifyAuthChanged();

  return toFieldAccount(nextAccount);
}

export function getCurrentAccount(): FieldAccount | null {
  if (!hasStorage()) return null;

  try {
    const accountId = window.localStorage.getItem(SESSION_KEY);
    if (!accountId) return null;

    const account = readAccounts().find((item) => item.id === accountId);
    if (!account) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return toFieldAccount(account);
  } catch {
    return null;
  }
}
