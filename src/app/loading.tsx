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

function SectionSkeleton({ count }: { count: number }) {
    return (
        <section>
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}

export default function Loading() {
    return (
        <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
                <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
                    <div className="w-full max-w-xl space-y-4">
                        <div className="h-6 w-44 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
                    </div>
                    <div className="h-44 w-56 animate-pulse rounded-xl bg-gray-200 md:w-80" />
                </div>
            </div>

            <SectionSkeleton count={6} />
            <SectionSkeleton count={6} />
            <SectionSkeleton count={6} />
        </main>
    );
}