"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const NavLinks = ({ categories }: { categories: Category[] }) => {
    const pathname = usePathname();
    return (
        <div className="flex gap-2">
            {categories.map((cat) => {

                const isActive = pathname === `/category/${cat.slug}`;

                return (
                    <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition 
                            ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-50"}`}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.nameBn}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export default NavLinks