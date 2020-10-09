const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 8080;

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DataBase is now Connected!"))
  .catch((err) => console.log(err));

app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/", require("./routes/redirect"));
app.use("/shorturl", require("./routes/urls"));

app.listen(port, () => {
  console.log("Server started at port " + port);
});
