const mongoose = require('mongoose');
const schema = mongoose.Schema;
const employeeSchema = new schema({
    name : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required :true
    },
    job : {
        type : String,
        required : true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'usermng'
    }
})
module.exports = mongoose.model('employeemng', employeeSchema)