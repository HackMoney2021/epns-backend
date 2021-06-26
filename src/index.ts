import express from 'express'
import epnsHelper, {InfuraSettings, NetWorkSettings, EPNSSettings} from '@epnsproject/backend-sdk'
require('dotenv').config();

// controllers

// main
const app = express()

// middlewares


// constants
const port = process.env.PORT;

// routes
app.get('/', (_, res) => {
  res.status(200).send()
})

app.listen(port, () => console.log(`Running on port ${port}`))