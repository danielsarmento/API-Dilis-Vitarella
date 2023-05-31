import express from 'express'
import { home } from '../controllers/home-controller.js'
import { register, searchRegister } from '../controllers/registers-controller.js'
import { registerManual } from '../controllers/manual-registers-controller.js'

export const routes = express.Router()

routes.get('/', home)
routes.get('/register', register)
routes.post('/sendManual', registerManual)
routes.get('/register/:phone', searchRegister)