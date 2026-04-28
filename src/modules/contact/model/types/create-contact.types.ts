import { InferType } from "yup"
import { createContactSchema } from "../validators/create-contact.schema"

export type CreateContactT = InferType<typeof createContactSchema>