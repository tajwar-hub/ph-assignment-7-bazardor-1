import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";


type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
};

function toBn(num: number) {
  return num.toLocaleString("bn-BD");
}

const HomePage = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  const data = await res.json();
  const products: Product[] = Array.isArray(data) ? data : data.data ?? [];

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <ProductSection title="আজ দাম বেড়েছে" tone="up" products={risers} />
      <ProductSection title="আজ দাম কমেছে" tone="down" products={fallers} />

      <ProductSection id="সব-পণ্য" title="সব পণ্য" subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`} products={products} />
    </main>
  );
}
export default HomePage