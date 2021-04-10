import Post from '../../models/postModel.js'
import { UserInputError, AuthenticationError } from 'apollo-server'
import checkAuth from '../../utils/checkAuth.js'

const commentresolvers = {
  Mutation: {
    createComment: async (parent, args, context, info) => {
      const user = checkAuth(context)
      if (args.body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: 'Comment must not be empty',
        })
      }
      const post = await Post.findById(args.postId)
      if (post) {
        post.comments.unshift({
          body: args.body,
          username: user.username,
          createdAt: new Date().toISOString(),
        })
        await post.save()
        return post
      } else {
        throw new UserInputError('Post not found')
      }
    },
    deleteComment: async (parent, args, context, info) => {
      const user = checkAuth(context)
      const post = await Post.findById(args.postId)
      if (post) {
        const commentIndex = post.comments.findIndex(
          (c) => c.id === args.commentId
        )
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    },
  },
}

export default commentresolvers
