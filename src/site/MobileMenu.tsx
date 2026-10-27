import { Link } from 'react-router-dom';
import { NAV_ITEMS } from './data';
import { useAuth } from './AuthProvider';
import { ProfileAvatar } from './components';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { account } = useAuth();
  const displayName = account ? account.nickname?.trim() || account.firstName : '';

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="lg:hidden absolute top-full left-4 right-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-2 shadow-2xl"
    >
      <div className="flex flex-col items-stretch">
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={
              index === 0
                ? 'text-left px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors'
                : 'text-left px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors'
            }
          >
            {item.label}
          </Link>
        ))}
        <Link
          to={account ? '/account' : '/sign-up'}
          onClick={onClose}
          className="mt-2 flex items-center justify-center gap-2 bg-white text-center text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
        >
          {account ? (
            <ProfileAvatar
              src={account.avatar}
              name={displayName}
              className="h-5 w-5 text-[8px]"
            />
          ) : null}
          {account ? 'Open my field record' : 'Sign Up'}
        </Link>
        {!account ? (
          <Link
            to="/sign-in"
            onClick={onClose}
            className="mt-2 border border-white/25 text-center text-white/80 text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/10"
          >
            Sign In
          </Link>
        ) : (
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/40">
            Signed in as {displayName}
          </p>
        )}
      </div>
    </div>
  );
}
