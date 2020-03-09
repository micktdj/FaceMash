/**
 * Update K-Factor of Elo Score. Based on these rules (FIDE)
 * @link https://en.wikipedia.org/wiki/Elo_rating_system#Most_accurate_K-factor
 * @param  {Number} elo Current Elo Score.
 * @param  {Number} currentK Current K-Factor.
 * @param  {Number} matchs Number of Matchs.
 * @return {Number} New K-Factor.
 */
function updateK (elo, currentK, matchs) {
  if (matchs <= 30 && elo <= 2400 && currentK === 40) return 40
  else if (matchs > 30 && elo <= 2400 && currentK >= 20) return 20

  return 10
}

/**
 * Calculates the probability that e2 (player2) wins.
 */
function probability (e1, e2) {
  return 1 / (1 + Math.pow(10, (e1 - e2) / 400))
}

/**
 * Calculate the two new scores after a match.
 * @param  {Number} elo1 First Score.
 * @param  {Number} elo2 Second Score.
 * @param  {Number} k1 K-Factor of Elo1 to increase sensitivity and favor new players.
 * @param  {Number} k2 K-Factor of Elo2 to increase sensitivity and favor new players.
 * @param  {Boolean} elo1Win  Depending on whether elo1 wins or not.
 * @return {Object} Two new scores.
 */
function newElo (elo1, elo2, k1, k2, elo1Win) {
  const pElo1 = probability(elo2, elo1)
  const pElo2 = probability(elo1, elo2)

  return [elo1 + k1 * ((elo1Win ? 1 : 0) - pElo1),
    elo2 + k2 * ((elo1Win ? 0 : 1) - pElo2)]
}

exports.newElo = newElo
exports.updateK = updateK
