"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email")).trim();
        const password = String(formData.get("password"));

        setLoading(true);
        const { error } = await authClient.signIn.email({ email, password });
        setLoading(false);

        if (error) {
            toast.error(error.message || "সাইন ইন করা যায়নি");
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে");
        router.push("/");
        router.refresh();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
                <p className="mt-1 text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-6 max-w-sm space-y-4 rounded-xl border border-gray-200 bg-white p-6"
            >
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-800">
                        ইমেইল
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-800">
                        পাসওয়ার্ড
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="font-medium text-green-600 hover:underline">
                        সাইন আপ করুন
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