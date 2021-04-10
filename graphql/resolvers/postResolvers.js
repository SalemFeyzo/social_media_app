import { AuthenticationError } from 'apollo-server'
import Post from '../../models/postModel.js'
import checkAuth from '../../utils/checkAuth.js'

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 })
        if (posts) {
          return posts
        } else {
          throw new Error('Posts empty')
        }
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
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const user = checkAuth(context)
      const newPost = new Post({
        body: args.body,
        username: user.username,
        createdAt: new Date().toISOString(),
        user: user.id,
      })
      const post = await newPost.save()
      return post
    },
    editPost: async (parent, args, context, info) => {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(args.postId)
        if (user.username === post.username) {
          post._id = post._id
          post.body = args.body || post.body
          post.username = post.username
          post.createdAt = post.createdAt
          post.comments = post.comments
          post.likes = post.likes

          const editedPost = await post.save()
          return editedPost
        }
        throw new AuthenticationError('Action not allowed')
      } catch (error) {
        throw new Error(error)
      }
    },
    deletePost: async (parent, args, context, info) => {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(args.postId)
        if (user.username === post.username) {
          await post.delete()
          return 'Post deleted'
        }
        throw new AuthenticationError('Action not allowed')
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}

export default postResolvers
