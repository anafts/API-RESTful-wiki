const express = require("express")
const mongoose = require ("mongoose")
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose connection URL
mongoose.connect("mongodb://localhost:27017/wikiDB");


//wiki schema 
const articleSchema = new mongoose.Schema ({
    title: {
        type: String
      },
      content : {
        type: String
      }
});

// wiki model 
const Article = mongoose.model("Article" , articleSchema);





app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

