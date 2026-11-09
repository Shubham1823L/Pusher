import { createPushNotification } from '@/controllers/firebaseController'
import asyncHandler from '@/middlewares/asyncHandler'
import express from 'express'

const router = express.Router()

router.post('/push-notifications', asyncHandler(createPushNotification))

export default router