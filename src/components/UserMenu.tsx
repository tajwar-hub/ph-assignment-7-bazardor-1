"use client";

import Link from "next/link";
import { useState } from "react";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

type UserMenuProps = {
    name: string;
    email: string;
    image?: string | null;
};

const UserMenu = ({ name, email, image }: UserMenuProps) => {
    const [open, setOpen] = useState(false);

    const firstName = name.split(" ")[0];

    return (
        <div className="relative">
            <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full px-2 py-1 cursor-pointer hover:bg-gray-100"
            >
                {image ? (
                    <Image src={image} alt={name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="text-sm font-medium text-gray-800">{firstName}</span>
                <FaChevronDown />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

                    <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-green-200 bg-white p-3 shadow-lg">
                        <div className="border-b border-green-200 pb-2">
                            <p className="text-sm font-semibold text-gray-900">{name}</p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>

                        <Link href="/profile" onClick={() => setOpen(false)}
                            className="mt-2 block rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-green-100"
                        >
                            আমার প্রোফাইল
                        </Link>

                        <SignOutButton className="block w-full rounded-md px-2 py-2 text-left text-sm text-red-600 hover:bg-red-100">
                            সাইন আউট
                        </SignOutButton>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserMenu