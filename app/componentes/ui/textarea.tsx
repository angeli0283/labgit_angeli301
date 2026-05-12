import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <label className="space-y-2 text-sm text-slate-700">
      {label && <span className="font-medium">{label}</span>}
      <textarea
        className={clsx(
          "w-full min-h-[120px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200",
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-100",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </label>
  );
}
