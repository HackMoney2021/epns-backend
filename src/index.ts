const express = require("express");
require('dotenv').config();
import { initSF } from "./superfluid";

initSF();

// const app = express();
// const port = process.env.PORT;

// // routes
// app.get('/', (_: any, res: any) => {
//   res.status(200).send()
// })

// app.listen(port, () => console.log(`Running on port ${port}`));