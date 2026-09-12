import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-shop_dark_green relative overflow-hidden p-4">
        <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-shop_light_green/25 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-shop_orange/20 blur-3xl animate-float" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative z-10 w-full flex justify-center">{children}</div>
      </div>
    </AuthProvider>
  );
}
