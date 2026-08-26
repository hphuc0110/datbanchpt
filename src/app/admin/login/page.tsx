"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/data/content";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!hasSupabaseConfig()) {
        // Demo login — any credentials
        router.push("/admin");
        return;
      }

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-charcoal px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border">
            <Image src="/logo.svg" alt={SITE.name} fill className="object-cover p-1" />
          </div>
          <h1 className="text-xl font-bold text-brand-charcoal">Admin Login</h1>
          <p className="mt-1 text-sm text-brand-muted">{SITE.name}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Email
            <input
              type="email"
              required
              className="form-input mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cunghyphattai.vn"
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Mật khẩu
            <input
              type="password"
              required
              className="form-input mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!hasSupabaseConfig() && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Chưa cấu hình Supabase — nhập bất kỳ email/mật khẩu để vào demo
              admin.
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}
