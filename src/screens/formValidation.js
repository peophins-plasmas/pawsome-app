import * as Yup from 'yup';

export const FormValidation = Yup.object().shape({
  petName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  species: Yup.string()
    .min(3, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  weight: Yup.number()
    .min(0, "Invalid Weight!")
})
