import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { CustomInput } from "./ui/CustomInput";
import { Link } from "react-router-dom";

export function SignupForm({
  className,
  isRegister,
  formData,
  onHandleChange,
  onSubmit,
  authLoading,
  errorMessage,
}) {
  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      <Card className="relative flex min-h-[44rem] w-full flex-col gap-8 overflow-hidden rounded-[32px] border border-white/12 bg-slate-950/72 px-3 py-3 text-slate-100 shadow-[0_30px_90px_rgba(2,6,23,0.58)] ring-1 ring-cyan-300/10 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_28%,transparent_72%,rgba(16,185,129,0.08))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/50 to-transparent" />
        <CardHeader className="relative space-y-2 px-6 pt-8 text-center">
          <div className="mx-auto mb-3 flex h-13 w-13 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/90">
            ET
          </div>
          <CardTitle className="text-4xl font-semibold tracking-tight text-white">
            {isRegister ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-base text-slate-300/80">
            {isRegister
              ? "Set up your account and start organizing every rupee with clarity."
              : "Sign in to continue tracking expenses, budgets, and trends."}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 px-6 pb-8">
          <form className="h-full" onSubmit={onSubmit}>
            <FieldGroup className="h-full gap-5">
              {isRegister && (
                <Field>
                  <FieldLabel
                    htmlFor="name"
                    className="text-sm font-medium tracking-wide text-slate-100/90"
                  >
                    Full Name
                  </FieldLabel>
                  <CustomInput
                    id="name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onHandleChange}
                    placeholder="John Doe"
                    icon={User}
                    required
                  />
                </Field>
              )}

              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium tracking-wide text-slate-100/90"
                >
                  Email
                </FieldLabel>
                <CustomInput
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onHandleChange}
                  placeholder="m@example.com"
                  icon={Mail}
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="text-sm font-medium tracking-wide text-slate-100/90"
                >
                  Password
                </FieldLabel>
                <CustomInput
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onHandleChange}
                  placeholder="Enter your password"
                  icon={Lock}
                  required
                />
                <FieldDescription className="text-slate-400">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-300/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  {errorMessage}
                </div>
              ) : null}

              <div className="grid grid-cols-3 gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-center">
                <div>
                  <p className="text-xl font-semibold text-white">24/7</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Access
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">Fast</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Sync
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">Clear</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Insights
                  </p>
                </div>
              </div>

              <Field className="mt-2 gap-4">
                <Button
                  type="submit"
                  disabled={authLoading}
                  className={`h-13 rounded-2xl border border-cyan-300/40 bg-linear-to-r from-cyan-300 via-sky-300 to-emerald-300 text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.26)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 ${authLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {authLoading ? (
                    <div className="flex items-center gap-1">
                      <Loader2 className="animate-spin" />
                      <span>
                        {isRegister ? "Creating Account..." : "Signing In..."}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{isRegister ? "Create Account" : "Sign In"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
                <FieldDescription className="text-center text-slate-300/75 [&>a]:font-medium [&>a]:text-cyan-200 [&>a:hover]:text-cyan-100">
                  {isRegister ? (
                    <>
                      Already have an account? <Link to="/login">Sign In</Link>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{" "}
                      <Link to="/register">Create Account</Link>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
