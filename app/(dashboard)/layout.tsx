import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AuthProvider } from "@/components/auth/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { AUTH_TOKEN_COOKIE, AUTH_USERNAME_COOKIE } from "@/lib/auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  // Secondo controllo oltre a quello in proxy.ts: qui la sessione è verificata
  // prima di renderizzare, quindi non c'è alcun flash di contenuto protetto.
  if (!cookieStore.get(AUTH_TOKEN_COOKIE)?.value) {
    redirect("/login");
  }

  const username = cookieStore.get(AUTH_USERNAME_COOKIE)?.value ?? null;

  return (
    <AuthProvider username={username}>
      <div className="min-h-screen lg:flex">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </AuthProvider>
  );
}

export default Layout;
