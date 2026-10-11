import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
            <p className="text-6xl font-bold text-green-600">৪০৪</p>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
                পেজটি খুঁজে পাওয়া যায়নি
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরে গেছে অথবা কখনো ছিলই না।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700"
            >
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}