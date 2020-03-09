const { request } = require('graphql-request')

/* Simple test examples with Jest. */

const SIGN_UP = `
    mutation signup($input: RegisterInput!) {
        signup(input: $input)
    }
  `

describe('Register User', () => {
  test('Register a valid User', async () => {
    const data = await request('http://localhost:4000', SIGN_UP, {
      input: {
        login: 'Micka',
        pwd: 'Micka123',
        confPwd: 'Micka123',
        firstName: 'Mickael',
        lastName: 'Tordjman'
      }
    })
    expect(data.signup).toBe('Success')
  })
  test('Username Exist', async () => {
    const data = await request('http://localhost:4000', SIGN_UP, {
      input: {
        login: 'Micka',
        pwd: 'Micka123',
        confPwd: 'Micka123',
        firstName: 'Mickael',
        lastName: 'Tordjman'
      }
    })
    expect(data.signup).toBe('Another User with same username exists.')
  })
  test('Yup Validation', async () => {
    const data = await request('http://localhost:4000', SIGN_UP, {
      input: {
        login: '',
        pwd: 'Mic',
        confPwd: '3',
        firstName: '',
        lastName: ''
      }
    })
    expect(data.signup).toBeNull()
  })
})