const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash  = require('flash');

const User = require('./models/users.js');

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.post('/chat/save_details',function(request,response){
   console.log('chat')
   const data = new User.database({
      username:request.body.username,
      email:request.body.email,
      password:request.body.password
   })

   User.checkExistingUser(request.body.username,request.body.email,function(err,user){
      if(user){
         if(user[0].username == request.body.username && user[0].email != request.body.email){
            response.status(200).json({'message':'Username Exists'});
         }
         else if(user[0].username != request.body.username && user[0].email == request.body.email){
            response.status(200).json({'message':'Email already existed'});
         }
         else if(user[0].username == request.body.username && user[0].email == request.body.email){
            response.status(200).json({'message':'Username Exists'});
         }
         else{
            data.save(function(){
               console.log('User added');
            })
         }
      }
   })
});

const port = process.env.PORT || 1234;
server.listen(app.listen(port,console.log('Server is running at port 1234')));
