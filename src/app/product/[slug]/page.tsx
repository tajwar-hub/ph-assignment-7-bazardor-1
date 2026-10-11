import Link from "next/link";
import { notFound } from "next/navigation";
import MarketTable from "@/components/MarketTable";


type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    change: {
        dir: string;
        pct: number;
    };
    markets: Market[];
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

function toBn(num: number, decimals = 0) {
    return num.toLocaleString("bn-BD", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

function unitBn(unit: string) {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        pcs: "পিস",
    };
    return units[unit.toLowerCase()] ?? unit;
}

const ProductPage = async ({ params }: PageProps) => {
    const { slug } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("পণ্যের তথ্য আনা যায়নি");
    }

    const data = await res.json();
    const products: Product[] = Array.isArray(data) ? data : data.data ?? [];

    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const diff = Math.abs(product.today - product.yesterday);


    const minPrice = Math.min(...product.markets.map((m) => m.min));
    const maxPrice = Math.max(...product.markets.map((m) => m.max));
    const avgPrice = product.today;

    const badgeStyle = isUp ? "bg-red-50 text-red-600" : isDown ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500";

    return (
        <main className="mx-auto max-w-4xl space-y-6 px-4 py-6">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <Link href="/" className="hover:text-green-700">হোম</Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-green-700"
                >
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-800">{product.nameBn}</span>
            </nav>

            {/* Top summary card */}
            <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                        {product.image}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
                        <p className="text-sm text-gray-500">
                            প্রতি {unitBn(product.unit)} · {product.categoryNameBn}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span
                                className={`font-bold ${isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-600"
                                    }`}
                            >
                                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                            </span>{" "}
                            · {toBn(diff)} টাকা
                        </p>
                    </div>
                </div>

                <div className="rounded-xl bg-gray-100 px-6 py-3 text-center">
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    
                    <p className="text-3xl font-bold text-gray-900">
                        {toBn(product.today)}
                    </p>

                    <p className="text-xs text-gray-500">
                        টাকা / {unitBn(product.unit)}
                    </p>

                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${badgeStyle}`}>
                        {isUp ? "▲" : isDown ? "▼" : "—"} {toBn(product.change.pct, 1)}%
                    </span>
                </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

                        <p className="mt-1 text-xl font-bold text-green-600">
                            {toBn(minPrice)} <span className="text-sm">টাকা</span>
                        </p>

                        <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>

                        <p className="mt-1 text-xl font-bold text-red-600">
                            {toBn(maxPrice)} <span className="text-sm">টাকা</span>
                        </p>

                        <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">গড় দাম</p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                            {toBn(avgPrice)} <span className="text-sm">টাকা</span>
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            প্রতি {unitBn(product.unit)} এর হিসাবে
                        </p>
                    </div>
                </div>

                <h2 className="mb-3 mt-8 text-lg font-bold text-gray-900">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <MarketTable markets={product.markets} />
            </section>
        </main>
    );
}

export default ProductPage