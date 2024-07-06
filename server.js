const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/add", require("./routes/addUser"));
app.use("/delete", require("./routes/deleteUser"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/update", require("./routes/updateUser"));

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
