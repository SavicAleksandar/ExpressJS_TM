const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');

const logger = require("./midleware/logger");
const members = require("./Members");
const { title } = require("process");

const app = express();

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// init middleware
// app.use(logger);

// handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// homepage route
app.get("/", (req, res) => res.render("index", {title: "member app", members}));

// set a static folder
app.use(express.static(path.join(__dirname, "public")));

// members API routes
app.use("/api/members", require("./routes/api/members"))

// preverimo ce je kateri port prost, ce ne se uporabi port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));