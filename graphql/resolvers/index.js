import postResolvers from './postResolvers.js'
import commentresolvers from './commentResolvers.js'
import userResolvers from './userResolvers.js'

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentresolvers.Mutation,
  },
}

export default resolvers
