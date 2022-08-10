import userModel from "../model/userModel.js"; 
import {registerValidation, loginValidation} from "../validationJoi.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import SECRET_TOKEN from "../jwt-verifier/secret-token.js";


//-----------------------------------------------------------------//



// GET CONTROLLERS
export const getUsers  = async (req,res) => {
    try {
    const allUsers = await userModel.find();
    res.send({allUsers})
    }catch(error) {
        console.log(error);
    }
}



export const getSpecificUser  = (req,res) => {
    res.send(req.params.id);
}

//---------------------------------------------------------------//

//POST CONTROLLERS

//REGISTER USER

export const createUser  = async (req,res) => {
    //DATA VALIDATION
    const {error}=  registerValidation(req.body)
    if(error){ 
        return res.status(400).send(error.details[0].message)
    }
   
    //CHECKING DATABASE FOR MATCHING USERS
    const emailCheck = await userModel.findOne({email: req.body.email})

    if(emailCheck) {
        return res.send('Cannot add user. User already exists')
    }


    //Hashing password with bcrypt
    const security = await bcrypt.genSalt(10);
    const passwordSecured = await bcrypt.hash(req.body.password, security)

    
    //CREATING NEW USER
    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: passwordSecured
    })
    


    //TRY/CATCH SAVE ON DATABASE
    try {
    const savedUser =  await newUser.save()
    res.send(`The user with the name of  was saved in the databse`)
    }catch(error) {
        res.status(400).send(error);
    }

}




//LOGIN USER

export  const loginUser = async (req, res) => {
        //LOGIN VALIDATION 
        const {error} = loginValidation(req.body)
        console.log(loginValidation(req.body))
        if(error) {
           return res.send(error.details[0].message).status(400)
        }


        //Finding in database matching option with email and password

        const validUser = await userModel.findOne({email: req.body.email});
        if(!validUser) {
          return  res.send('Email incorrect or not found in database');
        }
        
        const validPassword = await bcrypt.compare(req.body.password, validUser.password)
        
        if(!validPassword) {
            return res.send('Incorrect password');
        }
        
        //JWT CREATION 

        const token = jwt.sign({_id: validUser._id}, SECRET_TOKEN);
        res.header('auth-token', token).send(token)
       
    }
 




//---------------------------------------------------------------//


//DELETE CONTROLLERS

export const deleteUser  = (req,res) => {
    res.send('user deleted')
}



//---------------------------------------------------------------//

// UPDATE CONTROLLERS

export const updateUser  = async (req,res) => {
    

    //Hashing new password
    const security = await bcrypt.genSalt(10);
    const passwordSecured = await bcrypt.hash(req.body.password, security)
    
    //Updating password
    try{
    const updatedUser = await userModel.updateOne(
        {_id: req.params.id},
        {$set: {password: passwordSecured}}
        )
    res.send(updatedUser)
    }catch(error){
        res.send(error).status(400)
    }
}


