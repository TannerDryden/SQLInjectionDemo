const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// middleware
app.use(cors());

// Routes
app.get("/products", async (req, res) => {
  try {
    const { price } = req.query;

    // SQL INJECTION VULNERABILITY
    const products = await pool.query(
        `SELECT productname,productid FROM product_catalog WHERE price<${price}`
        );

    // CORRECT PRACTICE
    // const products = await pool.query(
    //   "SELECT productname,productid FROM product_catalog WHERE price<$1",
    //   [`${price}`]
    // );

    res.json(products.rows);
    console.log(products.rows);
    console.log(
      "``````````````````````````````````````````````````````````````````````"
    );
    console.log(
      "````````````````````````````Query Success`````````````````````````````"
    );
    console.log(
      "``````````````````````````````````````````````````````````````````````"
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
