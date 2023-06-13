import express from 'express'
import cron from 'node-cron'
import axios from 'axios'
import { routes } from './http/routes/routes.js'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes)

cron.schedule('0-59/30 0-23 1-31 6 mon-tue-wed-thu-fri-sat-sun', () => {
    let hora = new Date
    console.log(`Executando rotina Programada...${hora.getHours()}:${hora.getMinutes()} | ${hora.getDate()}/${hora.getMonth()}/${hora.getFullYear()}`)
    axios.get(`http://45.179.88.29:4444/register`)
})

app.listen(4444, () => {
    console.log('HTTP server running at PORT: 4444')
})