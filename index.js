const express = require("express")
const path = require("path")
const exphandle = require("express-handlebars")
const handlebars = require("handlebars")
const bodyParser = require("body-parser")

const app = express();
const port = process.env.PORT || 8888;

app.engine("hbs", exphandle({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: path.join(__dirname, "/views/layouts"), // Layouts folder
    partialsDir: path.join(__dirname, "/views/partials"), // Partials folder
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
}))

app.set("view engine", "hbs")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function() {
    console.log("App listening at port "  + port);
    wakeUpDyno(dynoUrl);
});

const myHelpers = {
    equalsHelper: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  
    notEqualsHelper: function (arg1, arg2, options) {
      return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    },
  
    concatHelper: function(arg1, arg2) {
      return arg1.concat(arg2);
    },
  
    addHelper: function (a, b) {
      return parseInt(a) + b;
    },
    
    minusHelper: function (a, b) {
      return parseInt(a) - b;
    },
}
  
handlebars.registerHelper("equals", myHelpers.equalsHelper);
handlebars.registerHelper("notequals", myHelpers.notEqualsHelper)
handlebars.registerHelper("concat", myHelpers.concatHelper)
handlebars.registerHelper("add", myHelpers.addHelper)
handlebars.registerHelper("minus", myHelpers.minusHelper)

const wakeUpDyno = require('./keepAwake.js')
const dynoUrl = process.env.DYNO_URL;

/* ---------------------------------------- ROUTES ---------------------------------------- */
app.get("/", function(req, res) {
    res.render("page", {
        image: "home.png"
    });
})

app.get("/reasons_to_use", function(req, res) {
    res.render("page", {
        image: "reasons_to_use.png"
    });
})

app.get("/best_practices", function(req, res) {
    res.render("page", {
        image: "best_practices.png"
    });
})

app.get("/references", function(req, res) {
    res.render("page", {
        image: "references.png"
    });
})