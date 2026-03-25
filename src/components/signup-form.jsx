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
import { Lock, Mail, User } from "lucide-react";
import { CustomInput } from "./ui/CustomInput";
import { Link, useLocation } from "react-router-dom";

export function SignupForm({ className, ...props }) {
  const { pathname } = useLocation();

  const isRegister = pathname === "/register";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative flex min-h-155 flex-col gap-8 overflow-hidden rounded-[30px] border border-white/12 bg-slate-950/58 px-3 py-3 text-slate-100 shadow-[0_18px_60px_rgba(2,6,23,0.55)] ring-1 ring-cyan-300/10 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_28%,transparent_72%,rgba(96,165,250,0.08))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/50 to-transparent" />
        <CardHeader className="relative space-y-2 px-6 pt-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/90">
            ET
          </div>
          <CardTitle className="text-4xl font-semibold tracking-tight text-white">
            {isRegister ? " Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-base text-slate-300/80">
            {isRegister
              ? "Sign in to continue managing your wealth"
              : "Start your financial journey today"}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 px-6 pb-8">
          <form className="h-full">
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
                  placeholder="m@example.com"
                  icon={Mail}
                  required
                />
              </Field>
              <Field>
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
                    placeholder="Enter your password"
                    icon={Lock}
                    required
                  />
                </Field>
                <FieldDescription className="text-slate-400">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field className="mt-2 gap-4">
                <Button
                  type="submit"
                  className="h-12 rounded-2xl border border-cyan-300/40 bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-400 text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.26)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  {isRegister ? "Create Account" : "Sign In"}
                </Button>
                <FieldDescription className="text-center text-slate-300/75 [&>a]:font-medium [&>a]:text-cyan-200 [&>a:hover]:text-cyan-100">
                  {isRegister ? (
                    <>
                      Already have an account?{" "}
                      <Link to={"/login"}>Sign In</Link>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <Link to={"/register"}>Create Account</Link>
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
