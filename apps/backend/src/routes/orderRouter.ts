import {Router} from 'express'
import createOrder from '../engine/Order'
const router = Router()

router.post("/create",createOrder)

export default router