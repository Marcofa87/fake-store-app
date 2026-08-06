import React from "react";

import { AuthGuard } from "@/components/auth/auth-guard";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen">{children}</div>
    </AuthGuard>
  );
}

export default Layout;
