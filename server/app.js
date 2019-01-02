// Hämtar moduler
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
var bcrypt = require('bcrypt');
var path = require('path');

// Boilerplate för moduler
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'asdafkjhgsakdhaf',
    resave: false,
    saveUninitialized: false,
    cookie: {
    expires: 600000,
    secure: false
    }
   }));
app.use(cors({origin: 'http://localhost:4200', credentials:true}));
app.use(express.static(path.join(__dirname, '../dist')));

// Hämtar scheman
var Category = require('./models/category');
var Post = require('./models/post');
var User = require('./models/user');

// Sträng för uppkoppling till databas i MongoDB
var connstr = "mongodb://admin:kaffekakor33@datadesigncluster-shard-00-00-akkre.mongodb.net:27017,datadesigncluster-shard-00-01-akkre.mongodb.net:27017,datadesigncluster-shard-00-02-akkre.mongodb.net:27017/webbit?ssl=true&replicaSet=DataDesignCluster-shard-0&authSource=admin&retryWrites=true";

// Kopplar upp till databas i MongoDB
mongoose.connect(connstr).catch(function(err) {
    console.log("A database connection error occured: " + err);
}); 

/***** CREATE *****/
// Skapa ny kategori
app.post('/api/category', (req, res) => {
    if(req.session.role == "admin"){
        // Hämtar de data som skickats med POST
        var newCategoryData = { name: req.body.name, description: req.body.description };
        // Skapar ny kategori med data som hämtats
        var category = new Category(newCategoryData, function(err) {
        });
        category.save();
        res.sendStatus(200);
    }
    else{
        res.sendStatus(403);
    }
});

// Skapa ny användare
app.post('/api/user', (req, res) => {
    // Hämtar de data som skickats med POST
    var newUserData = { username: req.body.username, password: req.body.password, mail: req.body.mail, role: "user" };
    // saltrounds till 10, hur mycket tid som behövs för att beräkna 1Bcrypt hash värde
    //Generar lösenordet som krypterat
    var hash = bcrypt.hashSync(newUserData.password, 0);
    newUserData.password = hash;
    //Kontrollerar	ett	inkommande	lösenord med ett krypteratlösenord
    bcrypt.compareSync(newUserData.password, hash);
    // Skapar ny användare med data som hämtats
    var user = new User(newUserData, function(err) {
    });
    // lagra innehållet i variabeln hash som lösenord för användaren
    user.save();
    res.sendStatus(200);
});

// Skapa nytt inlägg
app.post('/api/post', (req, res) => {
    console.log(req.session);
    if(req.session.role){
        var today = new Date();
        // Hämtar de data som skickats med POST
        //var newPostData = { user: "5c0512eb365ebf37acbe9d84", category: "5bf6a7fd5ad3fa26008ebdcb", postId: "", commentId:"", title: "Test5.0", content: "Jag testar vidare", publishedDate: today, editedDate: null };
        var newPostData = { user: req.session.userId, category: req.body.category, postId: req.body.postId, commentId: req.body.commentId, title: req.body.title, content: req.body.content, publishedDate: today, editedDate: null };
        // Skapar nytt inlägg/kommentar med data som hämtats
        var post = new Post(newPostData, function(err) {
        });
        post.save();
        res.sendStatus(200);
    }
    else{
        res.sendStatus(403);
        console.log("du är inte inloggad")
    }
});

// Skapa ny kommentar
app.post('/api/comment', (req, res) => {
    if(req.session.role){
        var today = new Date();
        // Hämtar de data som skickats med POST
        var newPostData = { user: req.session.userId, category: req.body.category, postId: req.body.postId, commentId: req.body.commentId, title: null, content: req.body.content, publishedDate: today, editedDate: null };
        // Skapar nytt inlägg/kommentar med data som hämtats
        var post = new Post(newPostData, function(err) {
        });
        res.sendStatus(200);
        post.save();
    }
    else{
        res.sendStatus(403);
    }
});

/****** READ *****/
// Hämta alla kategorier
app.get('/api/categories', (req, res) => {
    Category.find({ }, function(err, categories) {
        res.json(categories);
    });
});

// Hämta alla inlägg (sökfunktion)
app.get('/api/posts', (req, res) => {
    Post.find({ }, function(err, posts) {
        res.json(posts);
    });
});

// Hämta alla inlägg inom viss kategori
app.get('/api/:category/posts', (req, res) => {
    Post.find({category: req.params.category}, function(err, posts) {
        res.json(posts);
    });
});

// Hämta alla kommentarer till inlägg
app.get('/api/posts/:postId/comments', (req, res) => {
    Post.find({postId: req.params.postId}).
    populate('user').
    exec(function (err, post) {
        if (err) return res.json(err);
        res.json(post);
    });
});

// Hämta specifikt inlägg
app.get('/api/posts/:id', function(req, res){
    Post.findOne({_id: req.params.id}).
    populate('user').
    populate('category').
    exec(function (err, post) {
        if (err) return res.json(err);
        res.json(post);
    });
});

// Hämta specifik kategori
app.get('/api/category/:id', function(req, res){
    Category.findOne({_id: req.params.id}, function(err, post){
        res.json(post);
    });
});

//Hämta alla användare
app.get('/api/users', (req, res) => {
    if(req.session.role == "admin"){
        User.find({ }, function(err, users) {
            res.json(users);
        });
    }
    else{
        res.sendStatus(403);
    }
});

// Hämta specifik användare
app.get('/api/user/:id', (req, res) => {
        User.findOne({_id: req.params.id}, function(err, users) {
            res.json(users);
        });
});

/****** UPDATE *****/
// Redigera kategori
app.put('/api/category/:id', (req, res) => {
    if(req.session.role =="admin"){
        Category.findOneAndUpdate({ _id: req.params.id }, {$set:{name: req.body.name, description: req.body.description}}, {new: true}, (err, doc) => {
            if (err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
            }
        });
    }
    else{
        res.sendStatus(403);
    }
});

// Redigera inlägg/kommentar (post)
app.put('/api/post/:id', (req, res) => {
    if(req.session.role){
        var today = new Date();
        Post.findOneAndUpdate({  _id: req.params.id, user:req.session.userId }, {$set:{ title: req.body.title, content: req.body.content, editedDate: today }}, {new: true}, (err, doc) => {
            if (err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
           }
        });
    }
    else{
        res.sendStatus(403);
    }
});

// Redigera användare
app.put('/api/user/:id', (req, res) => {
    if(req.session.role=="admin"){
        User.findOneAndUpdate({ _id: req.params.id }, {$set:{ mail: req.body.mail }}, {new: true}, (err, doc) => {
            if (err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
            }
        });
    }
    else{
        res.sendStatus(403);
    }
});

/****** DELETE *****/
// Radera kategori
app.delete('/api/category/:id', (req, res) => {
    if(req.session.role =="admin"){
        Category.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
            if (err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
            }
        });
    }
    else{
        res.sendStatus(403);
    }
});

// Radera inlägg
app.delete('/api/post/:id', (req, res) => {
    if(req.session.role){
        Post.findOneAndDelete({ _id: req.params.id}, (err, doc) => {
            if (err){
                res.sendStatus(500);
            }
            else{
                Post.deleteMany({ postId: req.params.id }, (err, doc) => {
                });
                res.sendStatus(200);
            }
        });
    }
    else{
        res.sendStatus(403);
    }
});

// Radera användare
app.delete('/api/user/:id', (req, res) => {
    if(req.session.role=="admin"){
        User.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
            // Ta bort alla användarens inlägg + kommentarer också
            if (err){
                res.sendStatus(500);
            }
            else{
                res.sendStatus(200);
            }
        });
    }
    else{
        res.sendStatus(403);
    }

});

app.get('/api/test', function(req, res){
    if(req.session.role =="admin"){
        res.sendStatus(200);
    }else{
        res.sendStatus(403);
        console.log(req.session.role);
    }
});


//LOGIN punkt
app.post('/api/login', (req, res) => {
    if(!req.session.role){
        //var input = {username: req.query.username, password: req.query.password};
        var input = {username: req.body.username, password: req.body.password};
        console.log(input);
        if(!input){
            console.log("NO INPUT");
        }
        else{
            User.findOne({username: input.username}, function(err, user) {
                console.log(user);
                if(user){
                    if(input.username === user.username && bcrypt.compareSync(input.password, user.password)){
                        req.session.role = user.role;
                        req.session.userId = user._id;
                        req.session.save(function(err){
                            console.log(req.session);
                            res.redirect('/');
                        });
                    }
                    else{ 
                        console.log("wrong password");
                        res.sendStatus(400);
                    }
                }
                else{
                    console.log("Invalid username");
                    res.sendStatus(400);
                }
            });
        }
    }
});

//LOGOUT punkt
app.post('/api/logout', function(req, res){
        if(req.session.role){
            req.session.destroy();
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
});

// Hänvisar till API-ändpunkter
app.get('/*', function(req, res){
    console.log(path.join(__dirname, '../dist/index.html'));
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// Öppnar port för uppkoppling till server
app.listen(process.env.PORT || 8080, () => {
    console.log("Connected to server");
});