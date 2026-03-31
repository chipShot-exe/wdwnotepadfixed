import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "m-:inline-flex m-:items-center m-:justify-center m-:gap-2 m-:whitespace-nowrap m-:rounded-md m-:text-sm m-:font-medium m-:transition-colors m-:focus-visible:outline-none m-:focus-visible:ring-1 m-:focus-visible:ring-ring m-:disabled:pointer-events-none m-:disabled:opacity-50 m-:[&_svg]:pointer-events-none m-:[&_svg]:size-4 m-:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "m-:bg-primary m-:text-primary-foreground m-:shadow m-:hover:bg-primary/90",
        destructive:
          "m-:bg-destructive m-:text-destructive-foreground m-:shadow-sm m-:hover:bg-destructive/90",
        outline:
          "m-:border m-:border-input m-:bg-background m-:shadow-sm m-:hover:bg-accent m-:hover:text-accent-foreground",
        secondary:
          "m-:bg-secondary m-:text-secondary-foreground m-:shadow-sm m-:hover:bg-secondary/80",
        ghost: "m-:hover:bg-accent m-:hover:text-accent-foreground",
        link: "m-:text-primary m-:underline-offset-4 m-:hover:underline",
      },
      size: {
        default: "m-:h-9 m-:px-4 m-:py-2",
        sm: "m-:h-8 m-:rounded-md m-:px-3 m-:text-xs",
        lg: "m-:h-10 m-:rounded-md m-:px-8",
        icon: "m-:h-9 m-:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
