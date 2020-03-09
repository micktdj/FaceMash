const pool = require('../../../utils/database')
const { newElo, updateK } = require('../_modules/elo')

const resolvers = {
  Mutation: {
    versusPlayers: async (_, { idPlayer1, idPlayer2, player1Win }, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        /* Check if players exist */
        const [player1] = await pool.query('SELECT * FROM players WHERE id = ?', [idPlayer1])
        const [player2] = await pool.query('SELECT * FROM players WHERE id = ?', [idPlayer2])
        if (!player1 || !player2) { return null }

        /* Elo and K-Factor update. */
        const [newElo1, newElo2] = newElo(player1.elo, player2.elo, player1.k, player2.k, player1Win)
        const newK1 = updateK(newElo1, player1.k, player1.matchs + 1)
        const newK2 = updateK(newElo2, player2.k, player2.matchs + 1)

        await pool.query('UPDATE players SET k = ?, elo = ? WHERE id = ?', [newK1, newElo1, player1.id])
        await pool.query('UPDATE players SET k = ?, elo = ? WHERE id = ?', [newK2, newElo2, player2.id])

        return [
          {
            ...player1,
            elo: newElo1,
            k: newK1
          },
          {
            ...player2,
            elo: newElo2,
            k: newK2
          }
        ]
      } catch (err) {
        console.log('versusPlayers Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
