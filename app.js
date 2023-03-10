const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

const regusrer=require('./src/routes/register')
const loginuser=require('./src/routes/loginrouter')


app.use('/register',regusrer)
app.use('/login',loginuser)



app.listen(3000)