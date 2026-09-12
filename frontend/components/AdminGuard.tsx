"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading, firebaseUser, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-shop_dark_green" />
      </div>
    );
  }

  if (!firebaseUser || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center p-4">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="text-muted-foreground">
          You need to be signed in with an admin account to view this page.
        </p>
        <Link href="/sign-in" className="text-shop_dark_green font-semibold underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
