// Import Dependencies
import React, { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
    length = 6,
    value,
    onChange,
    onComplete,
    className,
    inputClassName,
    disabled = false,
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Get individual digits from value
    const digits = value.split("").slice(0, length);
    while (digits.length < length) {
        digits.push("");
    }

    const focusInput = (index: number) => {
        const input = inputRefs.current[index];
        if (input) {
            input.focus();
            input.select();
        }
    };

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Only allow digits
        if (newValue && !/^\d+$/.test(newValue)) {
            return;
        }

        // Handle multiple character paste
        if (newValue.length > 1) {
            const pastedData = newValue.slice(0, length - index);
            const newDigits = [...digits];

            pastedData.split("").forEach((char, i) => {
                if (index + i < length && /^\d$/.test(char)) {
                    newDigits[index + i] = char;
                }
            });

            const newOtp = newDigits.join("");
            onChange(newOtp);

            // Focus next empty input or last input
            const nextIndex = Math.min(index + pastedData.length, length - 1);
            focusInput(nextIndex);

            if (newOtp.length === length && onComplete) {
                onComplete(newOtp);
            }
            return;
        }

        // Handle single character input
        const newDigits = [...digits];
        newDigits[index] = newValue;
        const newOtp = newDigits.join("");

        onChange(newOtp);

        // Move to next input if value is entered
        if (newValue && index < length - 1) {
            focusInput(index + 1);
        }

        // Call onComplete when all digits are filled
        if (newOtp.length === length && onComplete) {
            onComplete(newOtp);
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace") {
            e.preventDefault();

            if (digits[index]) {
                // Clear current input
                const newDigits = [...digits];
                newDigits[index] = "";
                onChange(newDigits.join(""));
            } else if (index > 0) {
                // Move to previous input and clear it
                const newDigits = [...digits];
                newDigits[index - 1] = "";
                onChange(newDigits.join(""));
                focusInput(index - 1);
            }
        }

        // Handle left arrow
        if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            focusInput(index - 1);
        }

        // Handle right arrow
        if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            focusInput(index + 1);
        }

        // Handle delete
        if (e.key === "Delete") {
            e.preventDefault();
            const newDigits = [...digits];
            newDigits[index] = "";
            onChange(newDigits.join(""));
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();

        // Only process if pasted data contains only digits
        if (!/^\d+$/.test(pastedData)) {
            return;
        }

        const pastedDigits = pastedData.slice(0, length).split("");
        const newDigits = [...digits];

        pastedDigits.forEach((digit, i) => {
            if (i < length) {
                newDigits[i] = digit;
            }
        });

        const newOtp = newDigits.join("");
        onChange(newOtp);

        // Focus the last filled input
        const nextIndex = Math.min(pastedDigits.length, length - 1);
        focusInput(nextIndex);

        if (newOtp.length === length && onComplete) {
            onComplete(newOtp);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className={clsx("flex items-center justify-center gap-3", className)}>
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    disabled={disabled}
                    className={clsx(
                        "h-12 w-full flex-1 rounded-lg border text-center text-lg font-semibold transition-all duration-200",
                        "focus:outline-none",
                        "text-gray-900 placeholder-gray-400",
                        "dark:bg-surface-1 dark:text-dark-50 dark:placeholder-dark-400",
                        // ✅ Default (not focused)
                        "border-gray-300 dark:border-dark-400 hover:border-[#071952] dark:hover:border-[#071952]",
                        // ✅ Focused (active)
                        "focus:border-[#071952] dark:focus:border-[#071952]",
                        disabled && "cursor-not-allowed opacity-50",
                        inputClassName
                    )}
                />
            ))}
        </div>
    );
};
