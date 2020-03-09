const resolvers = {
  Query: {
    isLogin: (_, args, { req }) => typeof req.session.user !== 'undefined'
  }
}
exports.resolvers = resolvers
