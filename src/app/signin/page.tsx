import SignInForm from "@/components/SignInForm";

type PageProps = {
    searchParams: Promise<{ callbackUrl?: string; notice?: string }>;
};

const SignInPage = async ({ searchParams }: PageProps) => {
    const { callbackUrl, notice } = await searchParams;

    return <SignInForm callbackUrl={callbackUrl} notice={notice} />;
}


export default SignInPage