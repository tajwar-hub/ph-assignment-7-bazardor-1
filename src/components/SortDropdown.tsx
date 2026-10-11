"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const SortDropdown = ({ current }: { current: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        router.push(value === "default" ? pathname : `${pathname}?sort=${value}`);
    }

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="sort">সাজান</label>

            <div className="relative">
                <select
                    id="sort"
                    value={current}
                    onChange={handleChange}
                    className="cursor-pointer appearance-none rounded-md border border-gray-300
                     bg-white py-1.5 pl-3 pr-8 text-sm text-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="low">দাম: কম থেকে বেশি</option>
                    <option value="high">দাম: বেশি থেকে কম</option>
                </select>

                <svg className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2">

                    <FaChevronDown />
                </svg>
            </div>
        </div>
    );
}

export default SortDropdown