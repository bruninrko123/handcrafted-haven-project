import ProductCard from "@/app/ui/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}