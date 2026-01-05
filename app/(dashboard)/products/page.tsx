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
    <div className="p-8">
      <h1>Products</h1>
      <div className="grid grid-cols-8 gap-8">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="border-2 border-gray-300 rounded-md p-4"
          >
            <img
              src={product.category.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
