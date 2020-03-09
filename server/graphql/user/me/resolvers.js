
const resolvers = {
  Query: {
    me: (_, args, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      return req.session.user[0]
    }
  }
}

exports.resolvers = resolvers
