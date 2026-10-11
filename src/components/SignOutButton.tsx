"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type SignOutButtonProps = {
    className?: string;
    children: React.ReactNode;
};

const SignOutButton = ({ className, children }: SignOutButtonProps) => {
    const router = useRouter();

    async function handleSignOut() {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করা যায়নি");
            return;
        }

        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
    }

    return (
        <button type="button" onClick={handleSignOut} className={className}>
            {children}
        </button>
    );
}
export default SignOutButton