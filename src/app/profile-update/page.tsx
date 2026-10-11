"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ProfileUpdatePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name")).trim();

        if (name.length < 2) {
            toast.error("Name should be at least two letters");
            return;
        }

        setLoading(true);
        const { error } = await authClient.updateUser({ name });
        setLoading(false);

        if (error) {
            toast.error(error.message || "তথ্য আপডেট করা যায়নি");
            return;
        }

        toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
        router.push("/profile");
        router.refresh();
    }

    return (
        <main className="mx-auto max-w-md px-4 py-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
                <p className="mt-1 text-sm text-gray-500">আপনার নতুন নাম লিখুন।</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6">
                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-800">
                        নাম
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Your New Name"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button type="submit" disabled={loading}
                    className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "অপেক্ষা করুন..." : "আপডেট"}
                </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500">
                <Link href="/profile" className="hover:text-green-700">
                    ← প্রোফাইলে ফিরে যান
                </Link>
            </p>
        </main>
    );
}
export default ProfileUpdatePage