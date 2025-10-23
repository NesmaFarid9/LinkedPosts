import * as zod from "zod";

export const schemaReg = zod.object({
    name: zod.string().nonempty("Name is required")
        .min(3, "Name should be at least 3 characters")
        .max(20, "Name should be at most 20 characters"),

    email: zod.string().nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/, "Email is invalid"),

    password: zod.string().nonempty("Password is required")
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, "Password must be at least 8 chars, include upper, lower, number, and special character"),

    rePassword: zod.string().nonempty("Confirm password is required"),

    dateOfBirth: zod.string().nonempty("Date of birth is required")
        .pipe(zod.coerce.date())
        .refine((value) => {
            const yearOfBirth = value.getFullYear();
            const currentYear = new Date().getFullYear();
            return currentYear - yearOfBirth >= 18;
        }, { message: "Age must be 18 or older" }),

    gender: zod.string().nonempty("Gender is required"),
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
});
