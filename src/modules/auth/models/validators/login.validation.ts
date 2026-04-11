import * as yup from "yup";

export const loginValidator = yup.object({
    email: yup
        .string()
        .required("This field is required")
        .email("Field must be email"),
    password: yup
        .string()
        .required("This field is required")
        .min(6, "Min length > 6"),
});
