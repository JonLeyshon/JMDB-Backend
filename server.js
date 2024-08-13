const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/add", require("./routes/addUser"));
app.use("/delete", require("./routes/deleteUser"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/update", require("./routes/updateUser"));
app.use("/read", require("./routes/readUser"));
app.use("/addContent", require("./routes/addContent"));
app.use("/checkContent", require("./routes/checkContent"));
app.use("/getFavouritedContent", require("./routes/getFavouritedContent"));
app.use("/getToWatch", require("./routes/getToWatch"));
app.use("/getImages", require("./routes/getImages"));

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
