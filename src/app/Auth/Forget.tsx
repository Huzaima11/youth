// Import Dependencies
import { Link } from "react-router";
import { PhoneIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";

// Local Imports
import { Button, Card, Input } from "@/components/ui";
import { Page } from "@/components/shared/Page";
import { useAuth } from "@/hooks";
import { forgetValidationSchema } from "@/schema/user";
import { useState } from "react";
import ForgetOtpVerification from "../../components/template/ForgetOtpVerification";
import Logo from "@/components/shared/Logo";


export default function Forget() {
    const [vissible, setVissible] = useState<boolean>(false);

    const { states, sendResetCode } = useAuth();
    const { loading, error } = states.forgot;

    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema: forgetValidationSchema,
        onSubmit: async (values) => {

            const res = await sendResetCode({
                phone: values.phone,
            });
            if (res) {
                setVissible(true)
            }
            console.log("");

        },
    });
    console.log("formik", formik.values.phone);

    return (
        <Page title="Forget Password">
            {
                vissible ?
                    <ForgetOtpVerification phone={formik.values.phone} setVissible={setVissible} />
                    :
                    <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
                        <div className="w-full max-w-[26rem]">
                            <div className="flex flex-col items-center text-center mb-6">
                                <Logo />
                            </div>
                            <div className=" border rounded-lg">
                                <div className="text-center pt-4">
                                    <div className="mt-4">
                                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                                            Forgot Password
                                        </h2>
                                        <p className="text-gray-400 dark:text-dark-300">
                                            Enter your phone number to reset it
                                        </p>
                                    </div>
                                </div>

                                <Card className="mt-5 rounded-lg p-5 lg:p-7">
                                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <div className="space-y-4">
                                            <Input
                                                name="phone"
                                                label="Phone Number"
                                                placeholder="Enter Phone Number"
                                                type="tel"
                                                prefix={
                                                    <PhoneIcon
                                                        className="size-5 transition-colors duration-200"
                                                        strokeWidth="1"
                                                    />
                                                }
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {formik.errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* API Error */}
                                        {error && (
                                            <div className="mt-3 rounded-md bg-red-50 p-2 text-xs text-red-600">
                                                {error}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="mt-5 w-full"
                                            color="primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Get Reset Code"}
                                        </Button>
                                    </form>

                                    <div className="mt-6 text-center text-xs-plus ">
                                        <Link
                                            className="text-primary-800 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                                            to="/login"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <ArrowLeftIcon className="w-4 h-4" /> Back to Login
                                            </div>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </main>
            }

        </Page>
    );
}
