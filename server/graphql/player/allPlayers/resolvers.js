const pool = require('../../../utils/database')

const resolvers = {
  Query: {
    allPlayers: async (_, __, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        return await pool.query('SELECT * FROM players ORDER BY elo DESC')
      } catch (err) {
        console.log('allPlayers Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
