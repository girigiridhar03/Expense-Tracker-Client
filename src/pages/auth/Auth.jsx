import { SignupForm } from "@/components/signup-form";
import authBg from "@/assets/auth-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authLogin, authRegister } from "@/store/auth/auth.service";
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const Auth = () => {
  const { authLoading, error } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isRegister = pathname === "/register";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const highlights = useMemo(
    () => [
      {
        icon: TrendingUp,
        title: "Real-time visibility",
        text: "See spending patterns, monthly totals, and budget movement at a glance.",
      },
      {
        icon: ShieldCheck,
        title: "Secure account flow",
        text: "Your backend auth remains intact while the UI feels clean and trustworthy.",
      },
      {
        icon: Sparkles,
        title: "Built for daily use",
        text: "Fast forms and focused navigation make the product feel ready for real usage.",
      },
    ],
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = {};
    try {
      if (isRegister) {
        result = await dispatch(authRegister(formData)).unwrap();
      } else {
        result = await dispatch(authLogin(formData)).unwrap();
      }
      if (result?.success) {
        navigate("/");
      }
    } catch (authError) {
      setLocalError(authError || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${authBg})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.16),transparent_22%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.88))]" />

      <div className="relative z-10 mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <section className="hidden max-w-2xl flex-col justify-center lg:flex">
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-sky-100/85 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4" />
            Modern finance workspace
          </div>

          <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
            {isRegister
              ? "Create your control center for everyday spending."
              : "Return to a clearer view of your finances."}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300/88">
            A polished dashboard experience layered on top of your existing
            server API, designed to make logging in, tracking expenses, and
            staying on budget feel reliable and professional.
          </p>

          <div className="mt-10 grid gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/12 text-sky-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300/80">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="relative z-10 flex w-full max-w-md justify-self-center lg:max-w-lg">
          <SignupForm
            isRegister={isRegister}
            formData={formData}
            onHandleChange={handleChange}
            onSubmit={handleSubmit}
            authLoading={authLoading}
            errorMessage={localError || error}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
