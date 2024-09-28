const mdb = require('mongoose')
 const classschema = new mdb.Schema({
    rollno:{
        type:String,
        required:true
    },
    student:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    teacher:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    teacherphone:{
        type:String,
        required:true
    },
    prmark:{
        type:String,
    },
    psmark:{
        type:String,
    },
    atmark:{
        type:String,
    },
    asmark:{
        type:String,
    },
    limark:{
        type:String,
    }

 })

const classmodel = mdb.model("classdetail",classschema)
module.exports=classmodel