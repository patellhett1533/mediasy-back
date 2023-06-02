const connectToMongo = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');



// routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const profileRoutes = require('./routes/profile');
const followRoutes = require('./routes/follow');
const likeRoutes = require('./routes/like');
const chatRoutes = require('./routes/chat');
const commentRoutes = require('./routes/comment');
const searchRoutes = require('./routes/search');
const notifyRoutes = require('./routes/notify');
const saveRoutes = require('./routes/save');

// connected to database
connectToMongo();


const app = express()
const port = 5000


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'uploads')))
app.use('/Userimages', express.static(path.join(__dirname, 'userImg')))

app.use('/api', authRoutes)
app.use('/api', postRoutes)
app.use('/api', profileRoutes)
app.use('/api', followRoutes)
app.use('/api', likeRoutes)
app.use('/api', chatRoutes)
app.use('/api', commentRoutes)
app.use('/api', searchRoutes)
app.use('/api', notifyRoutes)
app.use('/api', saveRoutes)

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }

    console.log("server is listening on port", port);
});
