import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv({ path: '../../config.env' })
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import Tour from '../../models/tourModel.js'
import User from '../../models/userModel.js'
import Review from '../../models/reviewModel.js'

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const toursFile = path.join(dirName, 'tours.json')
const usersFile = path.join(dirName, 'users.json')
const reviewsFile = path.join(dirName, 'reviews.json')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB).then(() => console.log('DB connection successfully'))

const tours = JSON.parse(fs.readFileSync(toursFile, 'utf-8'))
const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'))

async function importData() {
  try {
    await Tour.create(tours)
    await User.create(users, { validateBeforeSave: false })
    await Review.create(reviews)
    console.log('data loaded')
  } catch (error) {
    console.log(error.message)
  }
  process.exit()
}

async function deleteData() {
  try {
    await Tour.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log('data deleted')
  } catch (error) {
    console.log(error.message)
  }
  process.exit()
}

if (process.argv[2] === 'delete') {
  deleteData()
}
if (process.argv[2] === 'import') {
  importData()
}
