const mdb = require('mongoose');

const tnewschema = new mdb.Schema({username:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
college:{
    type:String,
    required:true
},
hashpass :{
    type:String,
    required:true
}
})
    

const tnew = mdb.model('teacher',tnewschema);
module.exports = tnew;