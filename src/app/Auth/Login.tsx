// Import Dependencies
import { Link, useNavigate } from "react-router";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useFormik } from 'formik';

// Local Imports
import { Button, Card, Input } from "@/components/ui";
import { Page } from "@/components/shared/Page";
import { OtpInput } from "@/components/template/OtpInput";
import { useAuth } from "@/hooks";
import { loginValidationSchema } from "@/schema/user";
import Logo from "@/components/shared/Logo";
// ----------------------------------------------------------------------

export default function LoginIn() {
    const { states, loginUser } = useAuth();
    const { loading, error } = states.login;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            phone: "",
            pin: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await loginUser({
                    phone: values.phone,
                    password: values.pin,
                });

                if (res?.user) {
                    navigate("/dashboard");
                    resetForm();
                }
            } catch (error) {
                console.error(error);
            }
        }
    });


    return (
        <Page title="Login">
            <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
                <div className="w-full max-w-[28rem] p-4 sm:px-5">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center">
                        <Logo />
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold text-[#071952] dark:text-dark-100">
                                Welcome Back
                            </h2>
                            <p className="text-gray-400 dark:text-dark-300">
                                Please sign in to continue
                            </p>
                        </div>
                    </div>


                    {/* Card */}
                    <Card className="mt-5 rounded-lg p-5 lg:p-7 border">
                        <form autoComplete="off" onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                {/* Phone Input */}
                                <div>
                                    <Input
                                        name="phone"
                                        label="Phone Number"
                                        placeholder="Enter Phone"
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

                                {/* OTP Input */}
                                <div>
                                    <label className="mb-2 block text-sm font-normal text-gray-700 dark:text-dark-200">
                                        Enter PIN
                                    </label>
                                    <OtpInput
                                        length={4}
                                        value={formik.values.pin}
                                        onChange={(val) => formik.setFieldValue("pin", val)}
                                        onComplete={(val) => formik.setFieldValue("pin", val)}
                                    />
                                    {formik.touched.pin && formik.errors.pin && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {formik.errors.pin}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Forgot password */}
                            <div className="mt-4 flex items-center justify-end space-x-2">
                                <Link
                                    to="/forget"
                                    className="text-xs text-primary-800 transition-colors hover:text-primary-800 dark:text-dark-300 dark:hover:text-dark-100"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* API Error (from useAuth) */}
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
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>

                        {/* Other Links */}
                        <div className="mt-4 text-center text-xs-plus">
                            <p>
                                <span>Don’t have an account?</span>{" "}
                                <Link
                                    className="text-primary-800 hover:text-primary-600 dark:text-primary-400"
                                    to="/register"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </Card>
                </div>
            </main>
        </Page >
    );
}
