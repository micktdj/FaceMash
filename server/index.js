require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { genSchema } = require('./utils/genSchema')
const session = require('express-session')

const opts = {
  cors: {
    credentials: true,
    origin: [process.env.FRONT]
  }
}

const server = new GraphQLServer({
  schema: genSchema(),
  context: (req) => ({ req: req.request, res: req.response })
})

server.express.disable('x-powered-by')
// Using the MemoryStore: It's not efficient in production environment.
server.express.use(session({
  name: 'sessionID',
  secret: process.env.TOKEN,
  resave: true,
  saveUninitialized: false
}))

server.start(opts, () => console.log('Server is running on localhost:4000'))
