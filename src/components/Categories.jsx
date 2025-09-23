const categories = [
  { id: 1, name: "Electronics", img: "/images/cat1.jpg" },
  { id: 2, name: "Fashion", img: "/images/cat2.jpg" },
  { id: 3, name: "Home & Living", img: "/images/cat3.jpg" },
  { id: 4, name: "Sports", img: "/images/cat4.jpg" },
];

export default function Categories() {
  return (
    <section className="px-6">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <img src={c.img} alt={c.name} className="w-24 h-24 object-cover rounded-full mb-3" />
            <span className="font-medium">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
