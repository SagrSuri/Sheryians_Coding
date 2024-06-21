const express = require("express");
const app = express();
const path = require("path");
const jwt = require('jsonwebtoken')

const userModle = require("./models/user");
const postModle = require('./models/post')
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const post = require("./models/post");

const PORT = 8081;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// ++++++++++ HOME
app.get("/", (req, res) => {
  res.render("index");
});
// ++++++++++++LOGIN
app.get('/login', (req, res)=>{
    res.render('login');
})
//+++++++++++++LOGOUT
app.get('/logout', (req, res)=>{
    res.cookie('token', '')
    res.redirect('/login')
})
// +++++++++++++PROFILE
app.get('/profile', isLoggedIn, async (req, res)=>{
 let user = await userModle.findOne({email: req.user.email}).populate('posts')
    res.render('profile', {user})
})

//++++++++++LIKE DISLIKE
app.get('/like/:id', isLoggedIn,async (req, res)=>{
  let user = await postModle.findOne({_id: req.params.id}).populate('user')

  if(post.likes.indexOf(req.user.userid) === -1){
    post.likes.push(req.user.userid)
  } else{
    post.likes.splice(post.likes.indexOf(req.user.userid), 1)
  }

  await post.save()
     res.redirect('/profile')
 })

//++++++++++++++REGISTRATION++++++++++POST
app.post("/register", async (req, res) => {
  let { name, username, age, email, password } = req.body;

  let user = await userModle.findOne({ email });
  if (user) return res.status(500).send("User Already Registered");

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt , async (err, hash)=>{
      let user = await userModle.create({
            name,
            username,
            age,
            email,
            password: hash
        })
       let token = jwt.sign({email: email, userid: user._id}, 'iamsecretkey')
       res.cookie('token', token)
       res.send("Registered")
    })
  })
});


//++++++++++++++++LOGIN +++++++++++++POST_METHOD
app.post("/login", async (req, res) => {
  let { email , password } = req.body;

  let user = await userModle.findOne({ email });
  if (!user) return res.status(500).send("Something Went Wrong");

  bcrypt.compare(password, user.password, (err, result)=>{
    if(result){
        let token = jwt.sign({email: email, userid: user._id}, 'iamsecretkey')
        res.cookie('token', token)
        res.status(200).redirect('/profile')
    }
        else res.redirect('/login')
  })
});

// +++++++++++++POSTS_Post_METHOD
app.post('/post', isLoggedIn,async (req, res)=>{
  let user = await userModle.findOne({email: req.user.email})
  let {content} = req.body

  let post = await postModle.create({
    user: user._id,
    content
  })
  user.posts.push(post._id)
  await user.save()
  res.redirect('/profile')
 })

// Funtion
function isLoggedIn(req, res, next){
    if(req.cookies.token === ''){ res.redirect('/login')
      } else {
   let data = jwt.verify(req.cookies.token, 'iamsecretkey')
   req.user = data
    }
    next()
}

app.listen(PORT, () => {
  console.log(`The App is Running At http://localhost:${PORT}`);
});
