import { UserInputError } from 'apollo-server'
import Post from '../../models/postModel.js'
import checkAuth from '../../utils/checkAuth.js'

const likeResolvers = {
  Mutation: {
    likePost: async (parent, args, context, info) => {
      const user = checkAuth(context)
      const post = await Post.findById(args.postId)
      if (post) {
        if (post.likes.find((like) => like.username === user.username)) {
          // Post already liked, so unlike it
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          )
        } else {
          // Post not liked, so like it
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          })
        }
        await post.save()
        return post
      } else {
        throw new UserInputError('Post not found')
      }
    },
  },
}

export default likeResolvers
