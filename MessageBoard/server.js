const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
const flash = require('express-flash');
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}))
//take form data url/?etc
app.use(express.static(__dirname + "/static"));
mongoose.connect('mongodb://localhost/message_board', {useNewUrlParser: true});
const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (request, response) => {
   response.render("index");
});


const CommentSchema = new.mongoose.Schema({
    name: {type:String, required:true, minlength:3},
    comment: {type: String, required:true},
},{timestamps: true});
const MessageSchema = new mongoose.Schema({
    name: {type: String, required:true, minlength:[3, "This should be at least 3 characters long."]},
    message: {type: String, required:true, minlength:1},
    comments: [CommentSchema]
     },
    {timestamps: true});
const Message = mongoose.model('message', MessageSchema);app.use(express.static(__dirname + "/static"));
const Comment = mongoose.model('comment',CommentSchema);app.use(express.static(__dirname + "/static"));

app.post('/messages',(req,res)=>{
    
    res.redirect("/")
})


app.listen(8000, () => console.log("It's working m'dude"));
