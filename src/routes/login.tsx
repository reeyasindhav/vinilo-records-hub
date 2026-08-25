import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVinilo } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Vinilo" },
      {
        name: "description",
        content: "Sign in to your Vinilo account to manage your crate and listings.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useVinilo();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ name: email.split("@")[0], email });
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="paper-grain flex min-h-[calc(100vh-8rem)] items-center justify-center px-5 py-12">
      <div className="w-full max-w-md animate-rise">
        <p className="label-mono text-primary">Welcome back</p>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your crate, wishlist, and seller dashboard.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-5 border border-border bg-card p-8 shadow-sleeve"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="label-mono h-11 w-full rounded-sm">
            Sign in
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary underline-sweep">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
