import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function CustomInput({ icon: Icon, className, ...props }) {
  return (
    <div className="flex items-center rounded-2xl border border-white/10 bg-white/6 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-200 focus-within:border-cyan-300/60 focus-within:bg-slate-900/80 focus-within:shadow-[0_0_0_1px_rgba(103,232,249,0.28),0_0_24px_rgba(34,211,238,0.12)]">
      {Icon && <Icon className="mr-3 h-4.5 w-4.5 text-cyan-100/65" />}

      <Input
        className={cn(
          "h-10 border-none bg-transparent! px-0 text-sm text-slate-100 shadow-none placeholder:text-slate-400/80 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none [&:-webkit-autofill]:shadow-[0_0_0px_1000px_transparent_inset] [[&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-slate-100)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
