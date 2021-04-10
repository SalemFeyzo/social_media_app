import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        return user
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token', error)
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]")
  }
  throw new Error('Authorization header must be provided')
}

export default checkAuth
