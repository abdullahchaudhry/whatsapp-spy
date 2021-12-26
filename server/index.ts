import express, { Request, Response } from 'express'
import logger from 'morgan'

import { Server } from '@models'

const app = express()
const router = express.Router()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

router.route('/')
  .post((req: Request, res: Response) => {
    console.log(req.body)
    return res.send('OK')
  })

app.use(router)

const { HOST, PORT } = Server

app.listen(PORT, () => {
  console.log(`Listening on ${HOST}:${PORT}`)
})
