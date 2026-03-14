import { type InferType } from "yup";
import { loginValidator } from "../validators";

export type LoginSchema = InferType<typeof loginValidator>;
