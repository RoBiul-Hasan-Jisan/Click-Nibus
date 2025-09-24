const categories = [
  { id: 1, name: "Electronics", img: "/images/cat1.jpeg" },
  { id: 2, name: "Fashion", img: "/images/cat2.jpeg" },
  { id: 3, name: "Home & Living", img: "/images/cat3.jpeg" },
  { id: 4, name: "Sports", img: "/images/cat4.jpeg" },
];

export default function Categories() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="group relative flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Background gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-200 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>

            <img
              src={c.img}
              alt={c.name}
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-4 transform transition-transform duration-300 group-hover:scale-110"
            />

            <span className="font-semibold text-gray-900 text-center text-lg group-hover:text-pink-600 transition-colors duration-300">
              {c.name}
            </span>

            {/* Optional hover icon */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-500">
              →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
