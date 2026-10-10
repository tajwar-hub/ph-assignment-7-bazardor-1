import Marquee from "react-fast-marquee";


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



const PriceTicker = async () => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products`);
    const data = await res.json()
    const products: Product[] = data

    
    if (products.length === 0) {
        return <div className="h-10 animate-pulse border-b border-gray-200 bg-gray-100" />;
    }

    return (
        <div className="border-b border-gray-200 bg-white">
            <Marquee speed={40} pauseOnHover gradient={false}>
                {products.map((p) => {
                    const isUp = p.change.dir === "up";
                    const isDown = p.change.dir === "down";

                    return (
                        <div
                            key={p.id}
                            className="flex items-center gap-2 border-r border-gray-200 px-5 py-2 text-sm"
                        >
                            <span>{p.image}</span>
                            <span className="font-medium text-gray-800">{p.nameBn}</span>
                            <span className="text-gray-600">
                                {toBn(p.today)} টাকা/{unitBn(p.unit)}
                            </span>
                            <span
                                className={`font-semibold ${isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500"
                                    }`}
                            >
                                {isUp ? "▲" : isDown ? "▼" : "—"} {toBn(p.change.pct, 1)}%
                            </span>
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
}

export default PriceTicker