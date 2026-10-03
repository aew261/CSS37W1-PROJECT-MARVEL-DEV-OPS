// Small pure helpers shared by the Header, route guards and the admin area.

/** "Sibahle Mhlongo" -> from profile, falling back to Supabase metadata, then the email prefix. */
export const getDisplayName = (user, session) => {
  const meta = session?.user?.user_metadata ?? {};
  const first = user?.first_name ?? meta.first_name;
  const last = user?.last_name ?? meta.last_name;
  const full = [first, last].filter(Boolean).join(' ').trim();

  return full || session?.user?.email?.split('@')[0] || 'Account';
};

/** "Sibahle Mhlongo" -> "SM" (used for the avatar circle). */
export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Front-end admin check. This only controls what the UI shows - the real
 * enforcement MUST live in the backend / Supabase RLS (docs: role = 'admin').
 *
 * Local testing helper: add VITE_FORCE_ADMIN=true to your .env and every
 * signed-in user is treated as admin while running `npm run dev`.
 * It is ignored in production builds.
 */
export const checkIsAdmin = (user, session) => {
  if (!session) return false;
  if (import.meta.env.DEV && import.meta.env.VITE_FORCE_ADMIN === 'true') return true;
  return String(user?.role ?? '').toLowerCase() === 'admin';
};
