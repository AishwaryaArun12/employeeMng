const User = require('../model/user');
const Jwt = require('jsonwebtoken');
const jwtSecret = 'secretKey1234';

module.exports  = {
    register : async(req,res)=>{
       try {
         const user = await User.find({email : req.body.email})
         if(user.length > 0){
            res.status(500).json({error : 'You already registered, Please login..'})
         }else{
            const newUser = new User(req.body);
            newUser.save();
            res.status(200).json({message : 'Success'})
         }
       } catch (error) {
        console.log(error.message);
       }
    },
    login : async(req,res)=>{
        
        try {
            let user = null;
            if(req.body.login){
                 user = await User.findOne({email: req.body.email});
            }else{
                 user = await User.findOne({email: req.body.email,password : req.body.password});
            }
            if(user){
                const token = Jwt.sign({ email : req.body.email }, jwtSecret, { expiresIn: '1h' });
               req.body.email == 'aishwarya4arun@gmail.com' ? res.status(200).json({token,user,admin : true}) :  res.status(200).json({token,user,admin : false});
            }else{
                res.status(401).json({error : 'invalid credential'})
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    getUsers : async(req,res)=>{
        try {
            let users = await User.find();
            res.json({users})
        } catch (error) {
            console.log(error)
        }
    },
    blockUser : async(req,res)=>{
        try {
            const id = req.params.id;
           await User.findByIdAndUpdate(id,{active: false})
           res.status(200).json({data : 'ok'})
        } catch (error) {
            console.log(error);
        }
    },
    activeUser : async(req,res)=>{
        try {
            const id = req.params.id;
            await User.findByIdAndUpdate(id,{active: true})
            res.status(200).json({data : 'ok'})
        } catch (error) {
            console.log(error)
        }
    },
   
    
   
    editProfile : async (req,res)=>{
        try {
            const {id} = req.params;
            const {name,mobile,designation,address} = req.body;
            const edit = await User.findOneAndUpdate({_id:id},{name,mobile,designation,address},{new : true});
            res.status(200).json(edit)
        } catch (error) {
            console.log(error);
        }
    },
  

}

