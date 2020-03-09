const pool = require('../../../utils/database')
const bcrypt = require('bcryptjs')

const resolvers = {
  Mutation: {
    login: async (_, { login, pwd }, { req }) => {
      try {
        const user = await pool.query('SELECT * FROM users WHERE login = ?', [login])
        if (user[0]) {
          if (await bcrypt.compare(pwd, user[0].pwd)) {
            delete user[0].pwd
            req.session.user = {
              ...user
            }
            return true
          }
          throw new Error('Incorrect Password')
        }
        throw new Error('Invalid User')
      } catch (err) {
        console.log('login error', err)
        return false
      }
    }
  }
}
exports.resolvers = resolvers
