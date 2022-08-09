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



app.get("/articles" , function (req, res){

    Article.find(function(err, foundArticles){
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err)
        }
    });
});

app.post("/articles" , function(req,res) {

    const NewArticle = new Article ({
        title: req.body.title ,
        content: req.body.content
    });

    NewArticle.save( function(err){
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });  
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

