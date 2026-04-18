import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import * as factory from './factoryController.js'

const getAllUsers = factory.getAll(User)
const getUser = factory.getOne(User)
const updateUser = factory.updateOne(User)
const deleteUser = factory.deleteOne(User)

const createUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined. Please use /signup instead'
  })
}

const filterObj = (obj) => {
  const allowFields = ['name', 'email', 'photo']
  let result = Object.keys(obj)
    .filter((key) => allowFields.includes(key))
    .reduce((acc, currentKey) => {
      acc[currentKey] = obj[currentKey]
      return acc
    }, {})
  return result
}

const updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body)

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    returnDocument: 'after',
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })
  res.status(204).json({
    status: 'success',
    data: null
  })
})

const getMe = (req, res, next) => {
  req.params.id = req.user._id
  next()
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe
}
