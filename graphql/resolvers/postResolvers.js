import Post from '../../models/postModel.js'

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({})
        return posts
      } catch (error) {
        throw new Error(error)
      }
    },
    getPost: async (parent, args, context, info) => {
      const { postId } = args

      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}

export default postResolvers
