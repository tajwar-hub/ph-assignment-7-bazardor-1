import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

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

type PageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
};

function toBn(num: number) {
    return num.toLocaleString("bn-BD");
}

export default async function CategoryPage({ params, searchParams }: PageProps) {

    const { slug } = await params;
    const { sort } = await searchParams;

    const [categoryRes, productsRes] = await Promise.all([
        fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${slug}`, { cache: "no-store" }),
        fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`, { cache: "no-store" }),
    ]);


    if (!categoryRes.ok) {
        notFound();
    }
    const categoryData = await categoryRes.json();
    const category: Category = Array.isArray(categoryData) ? categoryData[0] : categoryData.data ?? categoryData;
    if (!category?.nameBn) {
        notFound();
    }

    const productsData = productsRes.ok ? await productsRes.json() : [];
    const products: Product[] = Array.isArray(productsData) ? productsData : productsData.data ?? [];


    const currentSort = sort === "low" || sort === "high" ? sort : "default";
    const sortedProducts = [...products];
    if (currentSort === "low") sortedProducts.sort((a, b) => a.today - b.today);
    if (currentSort === "high") sortedProducts.sort((a, b) => b.today - a.today);

    return (
        <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                    {category.icon}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{category.nameBn}</h1>
                    <p className="text-sm text-gray-500">
                        {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            <div className="flex justify-end rounded-xl border border-gray-200 bg-white p-4">
                <SortDropdown current={currentSort} />
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-4 py-16 text-center">
                    <p className="text-lg font-semibold text-gray-900">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
                    </p>
                    <Link
                        href="/"
                        className="mt-5 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500">
                        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}