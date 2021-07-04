"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require('dotenv').config();
const superfluid_1 = require("./services/superfluid");
superfluid_1.initSF();
// const app = express();
// const port = process.env.PORT;
// // routes
// app.get('/', (_: any, res: any) => {
//   res.status(200).send()
// })
// app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map