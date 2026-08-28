import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "outline" | "cream" | "white";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark border border-brand-red",
  outline:
    "bg-transparent text-white border border-white hover:bg-white/10",
  cream:
    "bg-brand-cream text-brand-red hover:bg-brand-cream-warm border border-brand-cream",
  white:
    "bg-white text-brand-red hover:bg-brand-cream border border-white",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  href,
  target,
  rel,
  children,
  className = "",
  type = "button",
  ...props
}: Props) {
  const classes = `inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`;

  if (href) {
    if (target) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
