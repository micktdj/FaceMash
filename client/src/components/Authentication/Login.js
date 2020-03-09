
import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import { Link, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import { LOGIN } from '../../utils/graphql'

function Login () {
  const [redirect, setRedirect] = useState(false)
  const [login, { data, loading }] = useMutation(
    LOGIN, {
      onCompleted (data) {
        if (data.login) {
          setRedirect(true)
        }
      }
    })
  const formik = useFormik({
    initialValues: {
      login: '',
      pwd: ''
    },
    onSubmit: values => login({ variables: { ...values } })
  })
  return (
    redirect
      ? <Redirect to='/app/home' />
      : <Fade>
        <Form onSubmit={formik.handleSubmit}>
          <h1 id='facemash' className='raleway text-primary'>FaceMash</h1>
          {data && <p className='errorForm'>{data.login === true ? 'Success' : 'Bad Password'}</p>}
          <Form.Group controlId='login'>
            <Form.Label className='text-white'>Login</Form.Label>
            <Form.Control
              name='login'
              type='text'
              placeholder='Login'
              required
              {...formik.getFieldProps('login')}
            />
          </Form.Group>
          <Form.Group controlId='pwd'>
            <Form.Label className='text-white'>Password</Form.Label>
            <Form.Control
              name='pwd' type='password'
              placeholder='Password'
              required
              {...formik.getFieldProps('pwd')}
            />
          </Form.Group>
          <Button variant='primary' disabled={loading} className='mb-3' type='submit'>
            {!loading
              ? <span>Sign In</span>
              : <Spinner animation='border' variant='light' />}
          </Button>
          <p>
            <Link style={{ textDecoration: 'none' }} className='text-light' to='/auth/register'>Sign Up</Link>
          </p>
        </Form>
      </Fade>
  )
}

export default Login
