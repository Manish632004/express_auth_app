const express = require("express");
const app = express();


require ('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

// route import and mount 

const user = require("./routes/user");

// cookie parser -- what is cookie parser

app.use("/api/users",user);

//  activate 

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
