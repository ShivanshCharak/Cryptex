import { it, describe, expect, beforeEach,vi} from 'vitest'

import {app} from '../index'

import request from 'supertest'
import { depthRouter } from '../routes/depth'
import { RedisManager } from '../RedisManager'
import { GET_DEPTH } from '../types'

describe('GET /depth',async ()=>{
    beforeEach(()=>{
        vi.clearAllMocks()
    })

    it(" Sohould return a not non empty object", async()=>{
        const res = await request(app).get("/").send({
            type:"GET_DEPTH",
            data:{
                market:"SOL_USDC"
            }
        })
    
    })
    it("Should return depth data for a valid symbol",async()=>{
        const mockSendAndAwait = vi.fn().mockResolvedValue({
            type:GET_DEPTH,
            payload: {
                bids: [[100.0, 1.5], [99.5, 2.0]],
                asks: [[101.0, 1.0], [101.5, 3.0]]
              }
        })
        vi.spyOn(RedisManager,'getInstance').mockReturnValue({
            sendAndAwait:mockSendAndAwait
        } as any)
    })

    const res = await request(app).get("/depth").query({symbol:"SOL_USD"})

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
        bids: [[100.0, 1.5], [99.5, 2.0]],
        asks: [[101.0, 1.0], [101.5, 3.0]]
    })

    it('should still return 200 if symbol is missing',async()=>{
        const mockSendAndAwait = vi.fn().mockResolvedValue({
            type:GET_DEPTH,
            payload:{bids:[],asks:[]}
        })
        vi.spyOn(RedisManager,"getInstance").mockReturnValue({
            sendAndAwait:mockSendAndAwait
        } as any)

        const res = await request(app).get('/depth')
        expect(res.status).toBe(200)
        expect(res.body).toEqual({bids:[],asks:[]})
    })

})



