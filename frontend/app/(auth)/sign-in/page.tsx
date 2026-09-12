"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Signed in!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@clicknibus.com");
      setPassword("Admin@12345");
    } else {
      setEmail("user@clicknibus.com");
      setPassword("User@12345");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 rounded-2xl shadow-2xl border-black/[0.06]">
      <CardHeader className="flex items-center flex-col">
        <Logo />
        <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-5 border-t pt-4 space-y-2">
          <p className="text-xs text-center text-muted-foreground">Quick demo login</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => fillDemo("admin")}>
              Fill Admin
            </Button>
            <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => fillDemo("user")}>
              Fill User
            </Button>
          </div>
          <p className="text-[11px] text-center text-muted-foreground">
            admin@clicknibus.com / Admin@12345 &nbsp;·&nbsp; user@clicknibus.com / User@12345
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Don&rsquo;t have an account? <Link href="/sign-up" className="text-shop_dark_green font-semibold">Sign up</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
