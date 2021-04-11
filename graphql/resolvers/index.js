import postResolvers from './postResolvers.js'
import commentresolvers from './commentResolvers.js'
import likeResolvers from './likeResolvers.js'
import userResolvers from './userResolvers.js'

const resolvers = {
  Post: {
    likesCount: (parent, args, context, info) => {
      console.log(parent)
      return parent.likes.length
    },
    commentsCount: (parent, args, context, info) => {
      return parent.comments.length
    },
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentresolvers.Mutation,
    ...likeResolvers.Mutation,
  },
}

export default resolvers
