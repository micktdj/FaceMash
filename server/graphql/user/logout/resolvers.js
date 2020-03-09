const resolvers = {
  Mutation: {
    logout: (_, __, { req, res }) => {
      res.clearCookie('sessionID')
      if (req.session.user) {
        req.session.destroy(err => {
          if (err) console.log('logout error', err)
        })
        return true
      }
      return false
    }
  }
}
exports.resolvers = resolvers
