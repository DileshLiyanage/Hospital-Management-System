const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes');





const app = express()
app.use(cors({
    origin : process.env.FONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)


//----------------lab items----------------//
//app.use('/uploads', express.static('uploads'));
const laboratoryItemRoutes = require("./routes/index");
app.use("/api", laboratoryItemRoutes);

const PORT = process.env.PORT || 8080;



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connect to DB")
        console.log("Server is runnig")
    })

})


