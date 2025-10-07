// Import Dependencies
import { Link } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";

// Local Imports
import { Button, Card, Input } from "@/components/ui";
import { Page } from "@/components/shared/Page";
import { useAuth } from "@/hooks";
import { registerValidationSchema } from "@/schema/user";
import { useState } from "react";
import RegisterVerification from "../../components/template/RegisterVerification";
import Logo from "@/components/shared/Logo";

// ----------------------------------------------------------------------

export default function Register() {
    const [vissible, setVissible] = useState<boolean>(false);
    const { states, registerUser } = useAuth();
    const { loading, error } = states.register;

    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try {
                const res = await registerUser(values.phone);

                if (res) {
                    setVissible(true);
                }
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <Page title="Register">
            {vissible ? (
                <RegisterVerification phone={formik.values.phone} setVissible={setVissible} />
            ) : (
                <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
                    <div className="w-full max-w-[28rem]">
                        <div className="flex flex-col items-center text-center mb-6">
                            <Logo />
                        </div>
                        <div className=" border rounded-lg py-4">
                            {/* Header */}
                            <div className="flex flex-col items-center text-center">

                                <div className="mt-4">
                                    <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                                        Create Account
                                    </h2>
                                    <p className="text-gray-400 dark:text-dark-300">
                                        Join us today and get started right away
                                    </p>
                                </div>
                            </div>

                            {/* Card */}
                            <Card className="mt-5 rounded-lg p-5 lg:p-7">
                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <div className="space-y-4">
                                        {/* Phone Input */}
                                        <div>
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
                                    </div>

                                    {/* API Error */}
                                    {error && (
                                        <div className="mt-3 rounded-md bg-red-50 p-2 text-xs text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="mt-5 w-full"
                                        color="primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Verification Code"}
                                    </Button>
                                </form>

                                {/* Other Links */}
                                <div className="mt-4 text-center text-xs-plus">
                                    <p>
                                        <span>Already have an account?</span>{" "}
                                        <Link
                                            className="text-primary-800 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                                            to="/login"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            )}
        </Page>
    );

}
