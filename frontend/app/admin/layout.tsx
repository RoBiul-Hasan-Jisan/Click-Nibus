import { AuthProvider } from "@/context/AuthContext";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import Logo from "@/components/Logo";
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft } from "lucide-react";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>
        <div className="min-h-screen flex flex-col md:flex-row bg-shop_light_bg">
          <aside className="md:w-64 md:min-h-screen bg-shop_dark_green text-white/80 p-5 flex flex-col gap-8">
            <Logo className="text-white" spanDesign="bg-white text-shop_dark_green group-hover:bg-shop_orange group-hover:text-white" />
            <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap hover:bg-white/10 hover:text-white hoverEffect"
                >
                  <item.icon size={16} /> {item.title}
                </Link>
              ))}
            </nav>
            <Link href="/" className="mt-auto flex items-center gap-2 text-sm text-white/60 hover:text-white hoverEffect">
              <ArrowLeft size={14} /> Back to store
            </Link>
          </aside>
          <main className="flex-1 p-5 md:p-8">{children}</main>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
