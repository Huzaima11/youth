import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import clsx from "clsx";
import { useId } from "@/hooks";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// SELECT ROOT
// ----------------------------------------------------------------------

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

// ----------------------------------------------------------------------
// SELECT GROUP
// ----------------------------------------------------------------------

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

// ----------------------------------------------------------------------
// SELECT VALUE
// ----------------------------------------------------------------------

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

// ----------------------------------------------------------------------
// SELECT TRIGGER (Matches Input styling)
// ----------------------------------------------------------------------

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  label?: React.ReactNode;
  description?: string;
  error?: boolean | React.ReactNode;
  prefix?: React.ReactNode;
  classNames?: {
    root?: string;
    label?: string;
    labelText?: string;
    wrapper?: string;
    trigger?: string;
    prefix?: string;
    error?: string;
    description?: string;
  };
  rootProps?: Record<string, any>;
  labelProps?: Record<string, any>;
  id?: string;
};

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      classNames = {},
      size = "default",
      children,
      label,
      description,
      error,
      prefix,
      disabled,
      rootProps,
      labelProps,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = useId(id, "select");

    const affixClass = clsx(
      "absolute top-0 flex h-full w-9 items-center justify-center transition-colors pointer-events-none",
      error ? "text-[#e63946]" : "text-gray-400"
    );

    const triggerContent = (
      <div
        className={clsx(
          "input-wrapper relative",
          label && "mt-1.5",
          classNames.wrapper
        )}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={selectId}
          data-slot="select-trigger"
          data-size={size}
          disabled={disabled}
          className={cn(
            // Base styles
            "form-input-base flex w-full items-center justify-between gap-2 rounded-md text-sm whitespace-nowrap outline-none transition-all duration-200",
            // Padding and Height
            "h-10 px-3 py-2",
            prefix && "ltr:pl-9 rtl:pr-9",
            size === "sm" && "h-8",
            // Border and background
            error
              ? "border-[#e63946] border"
              : disabled
                ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
                : "peer border border-gray-300 hover:border-[#071952] focus:border-[#071952]",
            // Focus ring
            !error &&
            !disabled &&
            "focus:ring-2 focus:ring-[#071952]/30",
            // Text and placeholder colors
            "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300",
            // Icon colors
            "[&_svg:not([class*='text-'])]:text-gray-400 [&_svg:not([class*='size-'])]:size-4",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0",
            className,
            classNames.trigger
          )}
          {...props}
        >
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {prefix && (
          <div
            className={clsx(
              "prefix ltr:left-0 rtl:right-0",
              affixClass,
              classNames.prefix
            )}
          >
            {prefix}
          </div>
        )}
      </div>
    );

    if (!label && !error && !description) {
      return triggerContent;
    }

    return (
      <div className={clsx("select-root", classNames.root)} {...rootProps}>
        {label && (
          <label
            htmlFor={selectId}
            className={clsx("input-label text-sm text-gray-700", classNames.label)}
            {...labelProps}
          >
            <span className={clsx("input-label", classNames.labelText)}>
              {label}
            </span>
          </label>
        )}

        {triggerContent}

        {error && typeof error !== "boolean" && (
          <span
            className={clsx(
              "input-error mt-1 text-xs text-[#e63946]",
              classNames.error
            )}
          >
            {error}
          </span>
        )}

        {description && (
          <span
            className={clsx(
              "input-description mt-1 text-xs text-gray-500",
              classNames.description
            )}
          >
            {description}
          </span>
        )}
      </div>
    );
  }
);

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// ----------------------------------------------------------------------
// SELECT CONTENT
// ----------------------------------------------------------------------

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-hidden rounded-md border bg-white shadow-md",
          "border-gray-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// ----------------------------------------------------------------------
// SELECT LABEL
// ----------------------------------------------------------------------

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-gray-500", className)}
      {...props}
    />
  );
}

// ----------------------------------------------------------------------
// SELECT ITEM
// ----------------------------------------------------------------------

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none transition-colors",
        "text-gray-800 hover:bg-[#071952]/10 hover:text-[#071952]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-[#071952]" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// ----------------------------------------------------------------------
// SELECT SEPARATOR
// ----------------------------------------------------------------------

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

// ----------------------------------------------------------------------
// SELECT SCROLL BUTTONS
// ----------------------------------------------------------------------

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-400",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-400",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

// ----------------------------------------------------------------------
// EXPORTS
// ----------------------------------------------------------------------

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
