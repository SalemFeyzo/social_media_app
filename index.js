import { ApolloServer } from 'apollo-server'
import colors from 'colors'
import dotenv from 'dotenv'
import ConnectDB from './config/db.js'
import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'

dotenv.config()

ConnectDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

const PORT = process.env.PORT || 5000

const startTheServer = async () => {
  try {
    const { url } = await server.listen({ path: '/api', port: PORT })
    console.log(`🚀 Server ready at ${url}`.yellow.bold)
  } catch (error) {
    console.log(`An error occurred: ${error}`.red.underline.bold)
  }
}
startTheServer()
