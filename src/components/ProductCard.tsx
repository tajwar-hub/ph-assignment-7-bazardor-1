import Link from "next/link";

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

function toBn(num: number, decimals = 0) {
    return num.toLocaleString("bn-BD", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
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

const ProductCard = ({ product }: { product: Product }) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const badgeStyle = isUp
        ? "bg-red-50 text-red-600"
        : isDown
            ? "bg-green-50 text-green-600"
            : "bg-gray-100 text-gray-500";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
        >
            {/* Top: emoji + name + unit */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                    {product.image}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{product.nameBn}</p>
                    <p className="text-xs text-gray-500">প্রতি {unitBn(product.unit)}</p>
                </div>
            </div>

            {/* Bottom: price + change badge */}
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="text-lg font-bold text-gray-900">
                        {toBn(product.today)} টাকা
                    </p>
                </div>

                <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeStyle}`}
                >
                    {isUp ? "▲" : isDown ? "▼" : "—"} {toBn(product.change.pct, 1)}%
                </span>
            </div>
        </Link>
    );
}

export default ProductCard