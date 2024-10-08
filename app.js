const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();




// Routes
const authRoutes = require("./routes/auth");

app.use(cors());
// Middlewares
app.use(bodyParser.json());
// app.use(formidable())
// Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", authRoutes);
// PORT
const port = 3000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});


