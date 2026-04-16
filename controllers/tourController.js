import Tour from '../models/tourModel.js'
import catchAsync from '../utils/catchAsync.js'
import * as factory from './factoryController.js'

const aliasTopTours = (req, res, next) => {
  const aliasQuery = {}
  req.aliasQuery = aliasQuery
  aliasQuery.limit = '5'
  aliasQuery.sort = '-ratingsAverage,price'
  aliasQuery.fields = 'name,ratingsAverage,price,duration,difficulty'
  next()
}

const getAllTours = factory.getAll(Tour)
const getTour = factory.getOne(Tour)
const createTour = factory.createOne(Tour)
const updateTour = factory.updateOne(Tour)
const deleteTour = factory.deleteOne(Tour)

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        count: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { minPrice: 1 }
    }
  ])
  res.status(200).json({
    status: 'success',
    data: {
      source: 'Tour',
      stats
    }
  })
})

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        count: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: {
        month: '$_id'
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 12
    }
  ])
  res.status(200).json({
    status: 'success',
    data: {
      source: 'Tour',
      plan
    }
  })
})

export {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
}
