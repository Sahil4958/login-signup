const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const collection = require("./config")

const port = 3030;

const app = express();
//convert data into json format

app.use(express.json());

app.use(express.urlencoded({extended : false}))
//use EJS as the view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"))

app.get("/" ,(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

// Register User

app.post("/signup", async(req,res)=>{
    const data = {
        name : req.body.username,
        password : req.body.password

    }

//if user is alredy exist

const exsitingUser = await collection.findOne({name: data.name})

if(exsitingUser){
    res.send("This user is alredy exist please try other username")
}else{
    //hash the password using bycrypt

    const saltRounds = 10 ;  //number of saltrounds using bycrypt

    const hashedPassword = await bcrypt.hash(data.password ,saltRounds);

    data.password = hashedPassword; //replace hashed password with original password

    const userdata = await collection.insertMany(data);
    console.log(userdata)
}
   
})

//login user

app.post("/login",async (req,res)=>{
    try{
        const check = await collection.findOne({name : req.body.username})
        if(!check){
            res.send("username is not valid")
        }
        //check the hashed password from the database to the plain text

       const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
       if(isPasswordMatch){
        res.render("home")
       }else{
        res.send("Wrong Password")
       }
    }catch{
      res.send("Wrong Detail")
    }
    
    
    
})
app.listen(port,()=>{
    console.log(`Server is running on http//localhost:${port}`);
})

