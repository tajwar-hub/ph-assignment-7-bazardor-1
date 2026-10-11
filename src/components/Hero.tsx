import Image from "next/image";

const Hero = () => {
    const today = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    });

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
            <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
                <div className="max-w-xl">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {today}
                    </span>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                <Image
                    src="/bazar-hero.png"
                    alt="বাজারের সবজি ও ফলের ঝুড়ি"
                    width={360}
                    height={260}
                    priority
                    className="h-auto w-56 md:w-80"
                />
            </div>
        </section>
    );
}

export default Hero