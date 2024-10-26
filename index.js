const express  = require("express")
const dotenv = require("dotenv");
const { connect } = require("http2");
const connectDB = require("./database");
const userRoute = require("./routers/userRouter")
const drugRoute = require("./routers/drugRouter")
const PORT = 3000;
app = express();
dotenv.config();

connectDB();

app.use(express.json())
app.use("/users",userRoute)
app.use("/drugs",drugRoute)
app.get("",(req,res) =>{
    res.json({message:"hello vamsi world"});
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port on http://localhost:${process.env.PORT}`)
})