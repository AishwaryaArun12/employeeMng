const User = require('../model/user');
require('dotenv').config();
const Jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports.jwtAuth = async(req,res,next)=>{
 
    try {
    
     const token = req.headers.authorization?.toString().split(' ')[1];
     if(!token){
       res.status(401).json({ message: 'Unauthorised' });
       return;
     }
     const decoded = Jwt.verify(token, jwtSecret);
     const parsedToken = decoded 
     const userId = parsedToken.id;
     
     const user = await User.findById(userId);
     if(user){
         next();
     }else{
         throw new Error("no user");
     }
     
   } catch (error) {
     res.status(401).json({ message: error.message });
   }
 }
