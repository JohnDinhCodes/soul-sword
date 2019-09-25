const express = require("express"),
      app     = express();
      port    = 3000;

app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index", { title: "Hey", message: "Hello There" });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});