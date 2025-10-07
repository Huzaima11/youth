// Import Dependencies
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";

// Local Imports
import { Button, Card, Input } from "@/components/ui";
import { useAuth } from "@/hooks";
import { profileValidationSchema } from "@/schema/user";
import { toast } from "react-toastify";
import Logo from "../shared/Logo";

// ----------------------------------------------------------------------
interface ProfileScreenProps {
    profileToken: string | null;
}

export default function Profile({ profileToken }: ProfileScreenProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { states, handleRegisterProfile } = useAuth();
    const { loading, error } = states.profile;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            profileImage: null as File | null,
        },
        validationSchema: profileValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("name", values.fullName);
            if (values.profileImage) {
                formData.append("image", values.profileImage);
            }

            const res = await handleRegisterProfile(formData, profileToken ?? undefined);
            if (res) {
                toast.success("Thanks! user name and pin send your phone number")
                navigate("/login");
                resetForm();
            }

        },
    });

    // ✅ Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            formik.setFieldValue("profileImage", file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // ✅ Only enable submit if both fields exist
    const isFormValid =
        formik.values.fullName.trim() !== "" && formik.values.profileImage !== null;

    return (
        <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
            <div className="w-full max-w-[32rem] border rounded-lg">
                {/* Header */}
                <div className="flex flex-col items-center text-center mt-6">
                    <Logo />
                </div>
                <div className="text-center mt-3">

                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                            Complete Your Profile
                        </h2>
                        <p className="text-gray-400 dark:text-dark-300">
                            Add your details to finish setting up your account
                        </p>
                    </div>
                </div>

                {/* Card */}
                <Card className="mt-2 rounded-lg p-5 lg:p-7">
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center pb-4">
                                <div
                                    className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center cursor-pointer"
                                    onClick={() => document.getElementById("imageUpload")?.click()}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <CameraIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                    )}
                                </div>

                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    onBlur={() =>
                                        formik.setFieldTouched("profileImage", true, true)
                                    }
                                />

                                {/* Validation Error */}
                                {formik.touched.profileImage && formik.errors.profileImage && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formik.errors.profileImage}
                                    </p>
                                )}

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                                    Upload your profile picture
                                </p>
                            </div>

                            {/* Name Input */}
                            <div>
                                <Input
                                    name="fullName"
                                    label="Full Name"
                                    placeholder="Enter Name"
                                    type="text"
                                    prefix={
                                        <UserIcon
                                            className="size-5 transition-colors duration-200"
                                            strokeWidth="1"
                                        />
                                    }
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formik.errors.fullName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="pt-8 pb-3">
                            <h3 className="text-gray-800 font-medium text-sm">
                                Account Setup
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                After completing your profile, we'll generate your login
                                credentials and send them via SMS to your registered phone
                                number.
                            </p>
                        </div>

                        {/* API Error */}
                        {error && (
                            <div className="mt-3 rounded-md bg-red-50 p-2 text-xs text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="mt-5 w-full"
                            color="primary"
                            disabled={loading || !isFormValid} // ✅ Button disabled
                        >
                            {loading ? "Completing..." : "Complete Profile"}
                        </Button>
                    </form>
                </Card>
            </div>
        </main>
    );
}
