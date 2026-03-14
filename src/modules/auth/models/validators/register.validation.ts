import * as yup from "yup";

export const registerValidators = {
	stepOne: yup.object({
		email: yup
			.string()
			.required("This field is required")
			.email("Field must be email"),
		username: yup
			.string()
			.required("This field is required")
			.min(6, "The minimal length is 6"),
		password: yup
			.string()
			.required("This field is required")
			.min(6, "The minimal length is 6"),
	}),
	stepTwo: yup.object({
		name: yup.string().required("This field is required"),
		surname: yup.string().required("This field is required"),
		avatar: yup.string().nullable(),
	}),
};
