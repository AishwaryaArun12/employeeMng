const User = require('../model/user');
require('dotenv').config();
const Jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports  = {
    register : async(req,res,next)=>{
       try {
         const user = await User.find({email : req.body.email})
         if(user.length > 0){
            res.status(409).json({error : 'You already registered, Please login..'})
         }else{
            const newUser = new User(req.body);
            newUser.save();
            res.status(200).json({message : 'Success'})
         }
       } catch (error) {
        next(error);
       }
    },
    login : async(req,res,next)=>{
        
        try {
            let user = null;
            if(req.body.login){
                 user = await User.findOne({email: req.body.email});
            }else{
                 user = await User.findOne({email: req.body.email,password : req.body.password});
            }
            if(user){
                const token = Jwt.sign({ id:user._id }, jwtSecret, { expiresIn: '1h' });
                res.status(200).json({token,user,admin : false});
            }else{
                res.status(403).json({error : 'invalid credential'})
            }
        } catch (error) {
            next(error);
        }
    },
    getUsers : async(req,res,next)=>{
        try {
            let users = await User.find();
            res.status(200).json({users})
        } catch (error) {
            next(error)
        }
    },
    getUser : async(req,res,next)=>{
        try {
            const {id} = req.params;
            let user = await User.findOne({_id:id});
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    },
   
    
    editProfile : async (req,res,next)=>{
        try {
            const {id} = req.params;
            const {name,mobile,designation,address} = req.body;
            const edit = await User.findOneAndUpdate({_id:id},{name,mobile,designation,address},{new : true});
            res.status(200).json(edit)
        } catch (error) {
            next(error);
        }
    },
  

}

