import * as yup from "yup";

export const createContactSchema = yup.object({
	name: yup.string().required(),
	surname: yup.string().required(),
	avatar: yup.string().nullable(),
});
