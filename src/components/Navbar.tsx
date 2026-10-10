"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const Navbar =  () => {
    const pathname = usePathname();
    const [categories, setCategories] = useState<Category[]>([]);

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });



    useEffect(() => {

        async function loadCategories() {
            try {
                const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories`);
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : data.data ?? []);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        }

        loadCategories();
    }, []);

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex items-center justify-between py-3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="p-2 bg-green-400 rounded-xl">
                            <Image
                                src="/logo-icon.png"
                                alt="বাজার দর"
                                width={30}
                                height={30}
                                className="rounded-lg"
                            />
                        </div>

                        <div>
                            <p className="text-lg font-bold leading-tight text-gray-900">
                                বাজার দর
                            </p>
                            <p className="text-xs text-gray-500">{date}</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/signin"
                            className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-green-700"
                        >
                            সাইন ইন
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                </div>


                <nav className="flex gap-2 overflow-x-auto pb-3">
                    {categories.length === 0
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-gray-200"
                            />
                        ))
                        : categories.map((cat) => {
                            const isActive = pathname === `/category/${cat.slug}`;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${isActive
                                        ? "bg-green-600 text-white"
                                        : "text-gray-700 hover:bg-green-50"
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            );
                        })}
                </nav>
            </div>
        </header>
    );
}

export default Navbar