import * as Yup from 'yup'

export const yupRegisterInput = Yup.object().shape({
  login: Yup.string().required('Required').max(30).matches(/^[a-zA-Z-_]+$/, 'Only letters !'),
  firstName: Yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  lastName: Yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  pwd: Yup.string().required('Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Min. 8 characters. It must contain at least one number and one letter.'),
  confPwd: Yup.string().required('Required').oneOf([Yup.ref('pwd')], 'Not Matching.')
})
