import {Router} from 'express'
import createOrder from '../engine/Order'
import { BulkCreateOrder } from '../engine/Order'
const router = Router()

router.post("/create",createOrder)
router.post("/bulk",BulkCreateOrder)

export default router