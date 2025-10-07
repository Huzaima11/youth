// Import Dependencies
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

// Local Imports
import { Button, Card } from "@/components/ui";
import { OtpInput } from "./OtpInput";
import { useAuth } from "@/hooks";
import { registerVerificationValidationSchema } from "@/schema/user";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import Logo from "../shared/Logo";

// ----------------------------------------------------------------------

interface RegisterVerificationProps {
    setVissible: (value: boolean) => void;
    phone?: string;
}

export default function ForgetOtpVerification({
    setVissible,
    phone
}: RegisterVerificationProps) {
    const [counter, setCounter] = useState(600); // 10 minutes
    const [resending, setResending] = useState(false);
    const navigate = useNavigate()

    // auth hook
    const { states, forgotCode, sendResetCode } = useAuth();
    const { loading, error } = states.forgotOtp; // assume states.verify
    const { error: resendError } = states.forgot;

    // countdown effect
    useEffect(() => {
        if (counter <= 0) return;
        const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    // format timer mm:ss
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    // Formik
    const formik = useFormik({
        initialValues: { otp: "" },
        validationSchema: registerVerificationValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const res = await forgotCode(values.otp);
            states.forgot.error = null
            console.log("res", res);
            if (res) {
                toast.success("New pin send your register phone number")
                navigate("/login")
                resetForm()
            }

        },
    });

    // resend otp

    const handleResend = async () => {
        const values = {
            phone: phone || "",
        };

        try {
            // ✅ clear formik OTP value + errors
            formik.setFieldValue("otp", "");
            formik.setTouched({ otp: false });
            formik.setErrors({});

            // ✅ clear API error in states if you store it
            states.forgotOtp.error = null;

            setResending(true);
            const res = await sendResetCode(values);

            if (res) {
                setCounter(600);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setResending(false);
        }
    };


    return (
        <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
            <div className="w-full max-w-[29rem] border rounded-lg">
                <div className="text-center pt-6">
                    <div className="flex flex-col items-center text-center mb-6 mt-4">
                        <Logo />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                            Verify Your Phone
                        </h2>
                        <p className="text-gray-400 dark:text-dark-300">
                            Enter the 6-digit code we sent to {phone}
                        </p>
                    </div>
                </div>

                <Card className="mt-3 rounded-lg p-5 lg:p-7">
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <div className="space-y-6">
                            <label className="mb-3 block text-sm font-normal text-gray-700 dark:text-dark-200">
                                Verification Code
                            </label>
                            <OtpInput
                                length={6}
                                value={formik.values.otp}
                                onChange={(val) => formik.setFieldValue("otp", val)}
                                disabled={counter <= 0 || loading}
                            />
                            {formik.touched.otp && formik.errors.otp && (
                                <p className="mt-1 text-xs text-red-500">{formik.errors.otp}</p>
                            )}
                        </div>

                        {/* API Error */}
                        {error && (
                            <div className="mt-3 rounded-md bg-red-50 p-2 text-xs text-red-600">
                                {error}
                            </div>
                        )}
                        {resendError && (
                            <div className="mt-3 rounded-md bg-red-50 p-2 text-xs text-red-600">
                                {resendError}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 text-xs-plus">
                            <span className="text-red-400">
                                Expires in {formatTime(counter)}
                            </span>
                            <Button
                                type="button"
                                variant="flat"
                                onClick={handleResend}
                                className="text-primary-800 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                            // disabled={counter > 0 || resending}
                            >
                                {resending ? "Resending..." : "Didn’t get it? Resend"}
                            </Button>

                        </div>

                        <Button
                            type="submit"
                            className="mt-5 w-full"
                            color="primary"
                            disabled={counter <= 0 || loading}
                        >
                            {loading ? "Verifying..." : "Verify Code"}
                        </Button>
                    </form>

                    <div className="pt-8 text-center text-xs-plus ">
                        <Button
                            variant="flat"
                            className="text-primary-800 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                            onClick={() => setVissible(false)}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <ArrowLeftIcon className="w-4 h-4" /> Change phone number
                            </div>
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    );
}
