import bcrypt from 'bcryptjs'
import { UserInputError } from 'apollo-server'
import User from '../../models/userModel.js'
import generateToken from '../../utils/generateToken.js'
import {
  validateRegisterInputs,
  validateLoginInputs,
} from '../../utils/validators.js'

const userResolvers = {
  Mutation: {
    loginUser: async (parent, args, context, info) => {
      const { username, password } = args
      const { errors, valid } = validateLoginInputs(username, password)
      if (!valid) throw new UserInputError('Errors', { errors })
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }
      const token = generateToken(user._id, user.username)
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    registerUser: async (parent, args, context, info) => {
      const {
        registerUserInputs: { username, email, password, confirmPassword },
      } = args

      // validate user data
      const { valid, errors } = validateRegisterInputs(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        })
      }
      // make sure user or email dosent already exist
      const userNameExist = await User.findOne({ username })
      const emailExists = await User.findOne({ email })
      if (userNameExist) {
        throw new UserInputError('username is taken', {
          errors: {
            username: 'Username is taken',
          },
        })
      }
      if (emailExists) {
        throw new UserInputError('Email already exists', {
          errors: {
            email: 'email already exists',
          },
        })
      }
      // hash password and create auth token
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      })
      const res = await newUser.save()
      const token = generateToken(res.id)
      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}

export default userResolvers
