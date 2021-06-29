import { config } from 'dotenv';
import express from 'express'

// the epns sdk
import {sdk} from "./config/config";

require('dotenv').config();

// controllers

// main
const app = express()

// middlewares


// constants
const port = process.env.PORT;

const epnsSDK = 

// routes
app.get('/', (_, res) => {
  res.status(200).send()
});

app.get("/createFlow", (req, res) => {

});

app.get("/cancelFlow", (req, res) => {

});


function listenForLowBalances(){

}


app.listen(port, () => console.log(`Running on port ${port}`))