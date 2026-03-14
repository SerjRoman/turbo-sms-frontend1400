import { InferType } from "yup";
import { registerValidators } from "../validators";

export type RegisterStepOneSchema = InferType<
	typeof registerValidators.stepOne
>;
export type RegisterStepTwoSchema = InferType<
	typeof registerValidators.stepTwo
>;
