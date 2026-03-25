import { SignupForm } from "@/components/signup-form";
import authBg from "@/assets/auth-bg.png";

const Auth = () => {
  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-cover bg-center p-6 md:p-10"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(3,7,18,0.28),rgba(2,6,23,0.74))]" />
      <div className="relative z-10 flex w-full max-w-md flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
};

export default Auth;
