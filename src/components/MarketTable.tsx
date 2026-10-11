type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

function toBn(num: number) {
    return num.toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
        maximumFractionDigits: 2,
    });
}

const MarketTable = ({ markets }: { markets: Market[] }) => {
    const rows = markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-140 text-sm">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-500">
                        <th className="px-4 py-3 text-left font-medium">বাজার</th>
                        <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                        <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                        <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                        <th className="px-4 py-3 text-right font-medium">গড়</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={`${row.market}-${index}`}
                            className={`border-b border-gray-200 last:border-b-0 ${index % 2 === 1 ? "bg-green-50/50" : "bg-white"}`}
                        >
                            <td className="px-4 py-3 font-medium text-gray-900">{row.market}</td>
                            <td className="px-4 py-3 text-gray-600">{row.division}</td>
                            <td className="px-4 py-3 text-right text-gray-700">
                                {toBn(row.min)} টাকা
                            </td>
                            <td className="px-4 py-3 text-right text-gray-700">
                                {toBn(row.max)} টাকা
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">
                                {toBn(row.avg)} টাকা
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MarketTable