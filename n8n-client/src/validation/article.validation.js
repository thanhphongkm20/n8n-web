import * as Yup from "yup";
import LANGUAGE from "../utils/language.util";

const validationSchema = Yup.object({
  title: Yup.string().required(
    LANGUAGE.FIELD_REQUIRED("Article title")
  ),
  description: Yup.string().required(
    LANGUAGE.FIELD_REQUIRED("Article description")
  ),
  slug: Yup.string().required(
    LANGUAGE.FIELD_REQUIRED("Slug")
  ),
  price: Yup.number()
    .typeError("Price must be a number")
    .required(LANGUAGE.FIELD_REQUIRED("Price"))
    .min(1, "Price must be greater than 0"),
  status: Yup.string().required(
    LANGUAGE.FIELD_REQUIRED("Status")
  ),
});

export default validationSchema;