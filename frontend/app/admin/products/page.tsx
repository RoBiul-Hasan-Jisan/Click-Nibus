"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product, Category, Brand } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

const emptyForm = {
  name: "",
  price: "",
  discountPercent: "",
  stock: "",
  description: "",
  images: "",
  status: "",
  isFeatured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const loadAll = async () => {
    const [p, c, b] = await Promise.all([
      api.get<{ products: Product[] }>("/products?limit=100"),
      api.get<{ categories: Category[] }>("/categories"),
      api.get<{ brands: Brand[] }>("/brands"),
    ]);
    setProducts(p.products);
    setCategories(c.categories);
    setBrands(b.brands);
  };

  useEffect(() => {
    loadAll().catch(() => toast.error("Failed to load products"));
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCategoryId("");
    setBrandId("");
    setOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: String(product.price),
      discountPercent: String(product.discountPercent || 0),
      stock: String(product.stock),
      description: product.description || "",
      images: (product.images || []).join(", "),
      status: product.status || "",
      isFeatured: !!product.isFeatured,
    });
    setCategoryId(product.category?._id || "");
    setBrandId(product.brand?._id || "");
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: Number(form.price),
      discountPercent: Number(form.discountPercent) || 0,
      stock: Number(form.stock),
      description: form.description,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      status: form.status || "",
      isFeatured: form.isFeatured,
      category: categoryId || undefined,
      brand: brandId || undefined,
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, { auth: true });
        toast.success("Product updated");
      } else {
        await api.post("/products", payload, { auth: true });
        toast.success("Product created");
      }
      setOpen(false);
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, { auth: true });
      toast.success("Product deleted");
      loadAll();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus size={16} className="mr-1" /> New product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit product" : "New product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Price</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label>Discount %</Label>
                  <Input type="number" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Stock</Label>
                  <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label>Status</Label>
                  <select
                    className="w-full border rounded-md h-9 px-2 text-sm"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="hot">Hot</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Category</Label>
                  <select className="w-full border rounded-md h-9 px-2 text-sm" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">None</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Brand</Label>
                  <select className="w-full border rounded-md h-9 px-2 text-sm" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                    <option value="">None</option>
                    {brands.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Image URLs (comma separated)</Label>
                <Input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="https://... , https://..." />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <textarea
                  className="w-full border rounded-md p-2 text-sm min-h-20"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                />
                Featured on homepage
              </label>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  {editingId ? "Save changes" : "Create product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.category?.name || "—"}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="capitalize">{p.status || "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline" onClick={() => openEdit(p)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleDelete(p._id)}>
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  No products yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
