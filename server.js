const express = require("express");
require("dotenv").config();

// init server
const app = express();

const infuraSettings = {
  projectID: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
};

const settings = {
  infura: infuraSettings,
};

const epnsSettings = {
  network: "ropsten",
  contractAddress: "0xc882dA9660d29c084345083922F8a9292E58787D",
  contractABI: require("./epns_contract.json"),
};

const sdk = new epnsHelper(
  "ropsten",
  process.env.STREAM_PRIVATE_KEY,
  settings,
  epnsSettings
);

const getSubs = async () => {
  const users = await sdk.getSubscribedUsers();
  console.log(users);
};

console.log("call getSubs");
getSubs();

app.listen(process.env.PORT, () => {
  // Insert Poller
  // Poll the four things
});
