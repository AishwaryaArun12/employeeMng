const Employee = require('../model/employee')

module.exports = {
    add : async(req,res)=>{
        try {
            const emp = await Employee.find({name : req.body.name})
            if(emp.length > 0){
               res.status(409).json({error : 'Employee already exist'})
            }else{
                const {id} = req.params;
               const newEmployee = new Employee({...req.body,userId : id });
               newEmployee.save();
               res.status(200).json({message : 'Success'})
            }

          } catch (error) {
           console.log(error.message);
          }
    },
    getAll : async(req,res)=>{
        try {
            const {id} = req.params
            const all = await Employee.find({userId : id});
            res.status(200).json({data : all})
        } catch (error) {
            console.log(error.message);
        }
    },
    edit : async(req,res)=>{
        try {
            const {id} = req.params 
            const edit = await Employee.findOneAndUpdate({_id : id},{$set : req.body},{new:true});
            res.status(200).json(edit)
        } catch (error) {
            res.status(200).json(error)
        }
    },
    get : async(req,res)=>{
        try {
            const {userId,empId} = req.params
            const all = await Employee.find({userId,_id:empId});
            res.status(200).json({data : all})
        } catch (error) {
            console.log(error.message);
        }
    },
}