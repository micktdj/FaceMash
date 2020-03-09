const yup = require('yup')

const yupRegisterInput = yup.object().shape({
  login: yup.string().required('Required').max(30).matches(/^[a-zA-Z-_]+$/, 'Only letters !'),
  firstName: yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  lastName: yup.string().required('Required').max(100).matches(/^[a-zA-Z-_]+$/, 'Only letters!'),
  pwd: yup.string().required('Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Min. 8 characters. It must contain at least one number and one letter.'),
  confPwd: yup.string().required('Required').oneOf([yup.ref('pwd')], 'Not Matching.')
})

exports.yupRegisterInput = yupRegisterInput
