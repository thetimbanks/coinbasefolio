const express = require("express");
const app = express();
const Gdax = require('gdax');

app.set("port", process.env.PORT || 3001);

const key = process.env.GDAX_API_KEY;
const b64secret = process.env.GDAX_SECRET;
const passphrase = process.env.GDAX_PASSPHRASE;

const apiURI = 'https://api.gdax.com';
const sandboxURI = 'https://api-public.sandbox.gdax.com';

const authedClient = new Gdax.AuthenticatedClient(key, b64secret, passphrase, apiURI);


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", (req, res) => {
  console.log("HELLO");
});

app.get("/api/accounts", (req, res) => {
  authedClient.getAccounts((err, response, data) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/api/fills", (req, res) => {
  authedClient.getFills((err, response, data) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/api/products", (req, res) => {
  authedClient.getProducts((err, response, data) => {
    console.log(data);
    res.send(data);
  });
});

app.get("/api/ticker/btc", (req, res) => {
  authedClient.get(['products', 'BTC-USD', 'ticker'], (err, response, data) => {
    console.log(data);
    res.send(data);
  })
});

app.get("/api/ticker/eth", (req, res) => {
  authedClient.get(['products', 'ETH-USD', 'ticker'], (err, response, data) => {
    console.log(data);
    res.send(data);
  })
});

app.get("/api/ticker/ltc", (req, res) => {
  authedClient.get(['products', 'LTC-USD', 'ticker'], (err, response, data) => {
    console.log(data);
    res.send(data);
  })
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
