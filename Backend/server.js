const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter")
const ProductRouter = require("./routes/ProductRouter")

const connectDB = require("./config/db");
require("dotenv").config();

PORT = process.env.PORT || 8080
connectDB();

app.use(bodyParser.json());
app.use(
  cors()
);
// app.options("*", cors());

app.use("/auth",AuthRouter)
app.use("/products",ProductRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);  
})
