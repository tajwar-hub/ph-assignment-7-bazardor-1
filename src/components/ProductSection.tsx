import ProductCard from "@/components/ProductCard";

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

type ProductSectionProps = {
    title: string;
    products: Product[];
    subtitle?: string;
    id?: string;
    tone?: "up" | "down";
};

const ProductSection = ({ title, products, subtitle, id, tone }: ProductSectionProps) => {
    return (
        <section id={id} className="scroll-mt-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                {tone === "up" && <span className="text-sm text-red-600"> ▲ </span>}
                {tone === "down" && <span className="text-sm text-green-600"> ▼ </span>}
                {title}
            </h2>

            {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default ProductSection