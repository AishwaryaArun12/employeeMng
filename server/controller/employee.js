const Employee = require('../model/employee')

module.exports = {
    add : async(req,res,next)=>{
        try {
            const emp = await Employee.find({empid : req.body.id,userId : id })
            if(emp.length > 0){
               res.status(409).json({error : 'Employee already exist with same id'})
            }else{
                const {id} = req.params;
               const newEmployee = new Employee({...req.body,userId : id });
               newEmployee.save();
               res.status(200).json({message : 'Success'})
            }

          } catch (error) {
           next(error);
          }
    },
    getAll : async(req,res,next)=>{
        try {
            const {id} = req.params
            const all = await Employee.find({userId : id});
            res.status(200).json({data : all})
        } catch (error) {
            next(error);
        }
    },
    edit : async(req,res,next)=>{
        try {
            const {id} = req.params 
            const edit = await Employee.findOneAndUpdate({_id : id},{$set : req.body},{new:true});
            res.status(200).json(edit)
        } catch (error) {
            next(error)
        }
    },
    get : async(req,res,next)=>{
        try {
            const {userId,empId} = req.params
            const all = await Employee.find({userId,_id:empId});
            res.status(200).json({data : all})
        } catch (error) {
            next(error.message);
        }
    },
}