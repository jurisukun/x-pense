import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#0F172A",
          },
        }}
      />
    </div>
  );
}
