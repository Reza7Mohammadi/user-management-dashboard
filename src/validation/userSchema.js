import * as yup from "yup";

export const userSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Enter a valid email"),

    phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
});

