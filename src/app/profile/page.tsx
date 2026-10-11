import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";


const ProfilePage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) {
        redirect("/signin")
    }

    const { name, email, image } = session.user;

    return (
        <main className="mx-auto max-w-2xl space-y-4 px-4 py-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>

            <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    {image ? (
                        <Image src={image} alt={name} className="h-14 w-14 rounded-xl object-cover" />
                    ) : (
                        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-2xl font-semibold text-white">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    )}

                    <div>
                        <p className="text-lg font-bold text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>

                <SignOutButton className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                    সাইন আউট
                </SignOutButton>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="text-base font-semibold text-gray-900">তথ্য</h2>

                <dl className="mt-4 space-y-3 text-sm">
                    <div>
                        <dt className="text-gray-500">নাম</dt>
                        <dd className="font-medium text-gray-900">{name}</dd>
                    </div>

                    <div>
                        <dt className="text-gray-500">ইমেইল</dt>
                        <dd className="font-medium text-gray-900">{email}</dd>
                    </div>
                </dl>

                <Link href="/profile-update"
                    className="mt-5 block rounded-lg bg-green-600 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-green-700"
                >
                    আপডেট
                </Link>
            </section>
        </main>
    );
}
export default ProfilePage