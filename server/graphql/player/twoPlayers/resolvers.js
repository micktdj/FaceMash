const pool = require('../../../utils/database')

const resolvers = {
  Query: {
    twoPlayers: async (_, __, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        const [totalMatchs] = await pool.query('SELECT value FROM parameters WHERE name = "totalMatchs"')
        const [player1, player2] = await pool.query(`SELECT * FROM players
          WHERE nextPossibleMatch <= ?
          ORDER BY RAND()
          LIMIT 2;
        `, [totalMatchs.value])

        /* Update Matchs to only pickup the same image after minimum 3 comparison round. */
        await pool.query('UPDATE players SET matchs = ?, nextPossibleMatch = ? WHERE id = ?',
          [player1.matchs + 1, totalMatchs.value + 4, player1.id])
        await pool.query('UPDATE players SET matchs = ?, nextPossibleMatch = ? WHERE id = ?',
          [player2.matchs + 1, totalMatchs.value + 4, player2.id])
        await pool.query('UPDATE parameters SET value = value + 1 WHERE name = "totalMatchs"')

        return player1 && player2 ? [player1, player2] : null
      } catch (err) {
        console.log('twoPlayers Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
