// For server components fetching PUBLIC data only (no Firebase token needed).
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function serverGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
