"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name")).trim();
        const email = String(formData.get("email")).trim();
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password.length < 8) {
            toast.error("Password must be at least 8 letters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error(`Previous password isn"t matching`);
            return;
        }

        setLoading(true);
        const { error } = await authClient.signUp.email({ name, email, password });
        setLoading(false);

        if (error) {
            toast.error(error.message || ` Account Couldn't be Created `);
            return;
        }

        toast.success(" Account Created Successfully! Please Sign In Now ");
        router.push("/signin");
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>

                <p className="mt-1 text-sm text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-sm space-y-4 rounded-xl border border-gray-200 bg-white p-6">
                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-800">
                        নাম
                    </label>
                    <input id="name" name="name" type="text" required placeholder=" Your Name "
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-800">
                        ইমেইল
                    </label>
                    <input id="email" name="email" type="email" required placeholder=" you@example.com "
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-800">
                        পাসওয়ার্ড
                    </label>
                    <input id="password" name="password" type="password" required minLength={8} placeholder=" At Least 8 Characters "
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-800">
                        পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required placeholder=" Enter The Password Again "
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে? {" "}

                    <Link href="/signin" className="font-medium text-green-600 hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500">
                <Link href="/" className="hover:text-green-700">
                    ← হোম পেজে ফিরে যান
                </Link>
            </p>
        </main>
    );
}