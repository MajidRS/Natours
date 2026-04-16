import express from 'express'

import * as tourController from '../controllers/tourController.js'

const router = express.Router()

router.route('/tours-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

export default router
