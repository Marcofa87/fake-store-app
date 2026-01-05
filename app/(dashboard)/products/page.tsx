type Product = {
  id: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  description: string;
  images: string[];
  price: number;
  title: string;
};

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="border-2 border-gray-300 rounded-md p-4 sm:p-6"
          >
            <img
              src={product.category.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
