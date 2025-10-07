import * as Yup from 'yup'

export const phoneSchema = Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits");

export const loginValidationSchema = Yup.object().shape({
    phone: phoneSchema,
    pin: Yup.string()
        .required("PIN is required")
        .matches(/^[0-9]{4}$/, "PIN must be 4 digits"),
});

export const registerValidationSchema = Yup.object().shape({
    phone: phoneSchema
});

export const registerVerificationValidationSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .matches(/^[0-9]{6}$/, "OTP must be 6 digits"),
});

export const profileValidationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    profileImage: Yup.mixed().required("Required"),
})

export const forgetValidationSchema = Yup.object().shape({
    phone: phoneSchema
});