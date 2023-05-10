import * as yup from 'yup';

// Accepted phone patterns
// 123-456-7890
// (123) 456-7890
// 123 456 7890
// 123.456.7890
// +91 (123) 456-7890
const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

export const candidateSchema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email().required('Please enter an email address.'),
    phone: yup
      .string()
      .matches(PHONE_REGEX, 'Please enter a valid phone number.'),
    position: yup.string(),
    level: yup.string(),
    cv: yup.mixed(),
    note: yup.string(),
  })
  .required();
