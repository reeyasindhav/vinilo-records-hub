import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = { name: string; email: string };

type Store = {
  user: User | null;
  signIn: (u: User) => void;
  signOut: () => void;
  crate: string[];
  toggleCrate: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  hydrated: boolean;
};

const Ctx = createContext<Store | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function ViniloProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [crate, setCrate] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(read<User | null>("vinilo.user", null));
    setCrate(read<string[]>("vinilo.crate", []));
    setWishlist(read<string[]>("vinilo.wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("vinilo.user", JSON.stringify(user));
    localStorage.setItem("vinilo.crate", JSON.stringify(crate));
    localStorage.setItem("vinilo.wishlist", JSON.stringify(wishlist));
  }, [user, crate, wishlist, hydrated]);

  const value = useMemo<Store>(
    () => ({
      user,
      hydrated,
      signIn: (u) => setUser(u),
      signOut: () => setUser(null),
      crate,
      toggleCrate: (id) =>
        setCrate((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id])),
      wishlist,
      toggleWishlist: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    }),
    [user, crate, wishlist, hydrated],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useVinilo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVinilo must be used inside ViniloProvider");
  return ctx;
}
