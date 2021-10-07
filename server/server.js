const express       = require('express');

const path          = require('path'); 

const bodyParser    = require('body-parser');
const cors          = require('cors');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');
//const http          = require("http").createServer(app);
//const io            = require("socket.io")(http);

//Import Routes
const authRoute     = require('./routes/auth');
const adminRoute     = require('./routes/adminRoute');
const authteacherRoute     = require('./routes/teacherauth');
const subjectRoute  = require('./routes/subjectRoute');
const presenceRoute  = require('./routes/presenceRoute');
const markRoute  = require('./routes/markRoute');
const tokensRoute   = require('./routes/tokensRoute.js')
//const Chat = require("./models/Chat")

const app           = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors())

//Route Middlewares
app.use('/admin', adminRoute);
app.use('/student', authRoute);
app.use('/teacher', authteacherRoute);
app.use('/subject', subjectRoute);
app.use('/presence', presenceRoute);
app.use('/mark', markRoute);
app.use('/tokens', tokensRoute);

//setup for deployment
app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000
//Connect to DB
mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true  })
.then( () => app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`)))
.catch((error) => console.log(error.message));
mongoose.set('useFindAndModify', false) //make sure that we don't get any warnings




