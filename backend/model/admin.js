const mdb = require('mongoose');

const anewschema = new mdb.Schema({username:{
    type:String,
    required:true
},
pass :{
    type:String,
    required:true
}
})
    

const anew = mdb.model('admin',anewschema);
module.exports = anew;