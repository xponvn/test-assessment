import * as yup from 'yup';

const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');
const regexPassword = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$'
);
export const validationLogin = {
  email: yup
    .string()
    .required('Please enter an email address')
    .matches(regexEmail, 'Please enter an email address'),
  password: yup
    .string()
    .required('Incorrect password')
    .matches(regexPassword, 'Incorrect password'),
};
