import React from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { yupRegisterInput } from '../../utils/yupSchemas'
import { SIGN_UP } from '../../utils/graphql'

function Register () {
  const [signUp, { data, loading }] = useMutation(SIGN_UP)
  const formik = useFormik({
    initialValues: {
      login: '',
      firstName: '',
      lastName: '',
      pwd: '',
      confPwd: ''
    },
    validationSchema: yupRegisterInput,
    onSubmit: values => signUp({ variables: { input: values } })
  })
  return (
    <Fade>
      <Form onSubmit={formik.handleSubmit} className='text-white'>
        {data && <p className='errorForm'>{data.signup}</p>}
        <Form.Group controlId='login'>
          <Form.Label>Login</Form.Label>
          <Form.Control
            name='login' type='text' placeholder='Login'
            {...formik.getFieldProps('login')}
          />
          {formik.touched.login && formik.errors.login ? (
            <p className='errorForm'>{formik.errors.login}</p>
          ) : null}
        </Form.Group>
        <Form.Group controlId='pwd'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='pwd' type='password' placeholder='Password'
            {...formik.getFieldProps('pwd')}
          />
          {formik.touched.pwd && formik.errors.pwd ? (
            <p className='errorForm'>{formik.errors.pwd}</p>
          ) : null}
        </Form.Group>
        <Form.Group controlId='confPwd'>
          <Form.Label>Confirmation</Form.Label>
          <Form.Control
            name='confPwd' type='password' placeholder='Confirmation'
            {...formik.getFieldProps('confPwd')}
          />
          {formik.touched.confPwd && formik.errors.confPwd ? (
            <p className='errorForm'>{formik.errors.confPwd}</p>
          ) : null}
        </Form.Group>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name='firstName' type='text' placeholder='First Name'
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className='errorForm'>{formik.errors.firstName}</p>
          ) : null}
        </Form.Group>
        <Form.Group controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name='lastName' type='text' placeholder='Last Name'
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className='errorForm mt-1'>{formik.errors.lastName}</p>
          ) : null}
        </Form.Group>
        <Button variant='primary' disabled={loading} className='mb-3' type='submit'>
          {!loading
            ? <span>Sign Up</span>
            : <Spinner animation='border' variant='light' />}
        </Button>
        <p>
          <Link style={{ textDecoration: 'none' }} className='text-light' to='/auth/login'>Sign In</Link>
        </p>
      </Form>
    </Fade>
  )
}

export default Register
