const express  = require("express")
const dotenv = require("dotenv");
const { connect } = require("http2");
const connectDB = require("./database");
const userRoute = require("./routers/userRouter")
const cors = require("cors")
const drugRoute = require("./routers/drugRouter")
const PORT = 3000;
app = express();
dotenv.config();

connectDB();
app.use(cors({
    origin:["http://localhost:3001","http://localhost:3002"],
    allowedHeaders:"Content-Type,Authorization",
    methods:"GET,PUT,POST,DELETE,OPTIONS,PATCH"
}))
app.use(cors)
app.use(express.json())
app.use("/users",userRoute)
app.use("/drugs",drugRoute)
app.get("",(req,res) =>{
    res.json({message:"hello vamsi world"});
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port on http://localhost:${process.env.PORT}`)
})