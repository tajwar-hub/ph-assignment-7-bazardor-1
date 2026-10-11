function CardSkeleton() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
                <div className="space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200" />
            </div>
        </div>
    );
}

export default function CategoryLoading() {
    return (
        <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />

                <div className="space-y-2">
                    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
                </div>
            </div>

            <div className="flex justify-end rounded-xl border border-gray-200 bg-white p-4">
                <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}