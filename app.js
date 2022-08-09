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


// request all articles 
app.route('/articles')

  .get(function(req, res) {

    Article.find(function(err, foundArticles){
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err)
        }
    });
  })


  .post(function(req, res) {

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
  })


  .delete(function(req, res) {

    Article.deleteMany( function(err){
        if (!err) {
            res.send("Successfully deleted all article.");
        } else {
            res.send(err)
        }
    });
  });



  // request a specific articles 
  app.route("/articles/:articleTitle")

  .get(function(req, res){

    Article.findOne({title: {$regex: new RegExp("^" + req.params.articleTitle, "i")} }, function(err, foundArticle) {
        if(foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles matching that little was found.")
        }
    });
  })

     // to update the entire article
  .put(function(req, res){

    Article.findOneAndUpdate(
        {title:req.params.articleTitle} ,
        {title:req.body.title , content: req.body.content} , 
         {overwrite:true} ,
         (err)=>{
            if(!err){
                res.send("Successfully updated!")
            }else {
                res.send(err)
            }
     });
  })


  .patch(function(req, res) {
    Article.updateOne(
        {title:req.params.articleTitle} ,
        {$set:req.body} ,
        err => {
            if (!err) {
        res.send('Successfully updated article!'); 
        } else {
            res.send(err);
        }
     });
  })

  .delete(function(req, res) {

    Article.findOneAndDelete(
        {title:req.params.articleTitle} ,
        {title:req.body.title , content: req.body.content} , 
        err => {
            if (!err) {
        res.send('Successfully deleted article!'); 
        } else {
            res.send(err);
        }
     });
  }); 





app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

