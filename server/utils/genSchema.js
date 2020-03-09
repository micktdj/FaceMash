
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')
const fs = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const glob = require('glob')

const genSchema = () => {
  try {
    const graphqlPath = path.join(__dirname, '../graphql')
    const graphqlTypes = glob
      .sync(`${graphqlPath}/**/*.graphql`)
      .map(x => fs.readFileSync(x, { encoding: 'utf8' }))
    const resolvers = glob
      .sync(`${graphqlPath}/**/resolvers.js`)
      .map(resolver => require(resolver).resolvers)
    return makeExecutableSchema({
      typeDefs: mergeTypes(graphqlTypes),
      resolvers: mergeResolvers(resolvers)
    })
  } catch (err) {
    console.log('genSchema error', err)
    return err
  }
}

exports.genSchema = genSchema
