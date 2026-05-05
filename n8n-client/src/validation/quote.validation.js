import * as Yup from "yup";
import LANGUAGE from "../utils/language.util";

const quoteValidation = Yup.object({
  companyName: Yup.string()
    .trim()
    .required(LANGUAGE.FIELD_REQUIRED("Company name")),

  contactPerson: Yup.string()
    .trim()
    .required(LANGUAGE.FIELD_REQUIRED("Contact person")),

  email: Yup.string()
    .trim()
    .email(LANGUAGE.FIELD_INVALID(LANGUAGE.USER.EMAIL))
    .required(LANGUAGE.FIELD_REQUIRED(LANGUAGE.USER.EMAIL)),

  budget: Yup.string()
    .required(LANGUAGE.FIELD_REQUIRED("Budget")),

  timeline: Yup.string()
    .required(LANGUAGE.FIELD_REQUIRED("Timeline")),

  description: Yup.string()
    .trim()
    .min(20, "Please provide more details")
    .required(LANGUAGE.FIELD_REQUIRED("Description")),
});

export default quoteValidation;