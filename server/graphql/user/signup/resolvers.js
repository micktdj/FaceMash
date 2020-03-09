const pool = require('../../../utils/database')
const bcrypt = require('bcryptjs')
const { uuid } = require('uuidv4')
const { yupRegisterInput } = require('../../../utils/yupSchemas')

const resolvers = {
  Mutation: {
    signup: async (_, { input }) => {
      try {
        await yupRegisterInput.validate(input, { abortEarly: false })
        const loginExist = await pool.query('SELECT login FROM users WHERE login = ?', [input.login])
        if (loginExist[0]) {
          return 'Another User with same username exists.'
        } else {
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(input.pwd, salt)
          await pool.query('INSERT INTO users (id,login,pwd,firstName,lastName) VALUES(?,?,?,?,?)',
            [uuid(), input.login, hashPassword, input.firstName, input.lastName])
          return 'Success'
        }
      } catch (err) {
        console.log('signup error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
