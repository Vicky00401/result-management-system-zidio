const mdb = require('mongoose');

const snewschema = new mdb.Schema({username:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
hashpass :{
    type:String,
    required:true
}
})
    

const snew = mdb.model('student',snewschema);
module.exports = snew;