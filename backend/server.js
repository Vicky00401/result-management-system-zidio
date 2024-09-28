const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bp = require("body-parser")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const app = express()
const excel = require('xlsx')
const classmodel=require('./model/class')
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const tnew = require("./model/treg")
const snew = require("./model/sreg")
const anew = require("./model/admin")
app.use(bp.urlencoded())
app.use(bp.json())
app.use(cors())

const secretkey = "murugan"

mongoose.connect("mongodb://localhost:27017/resultmanagement").then(console.log('db connected'))

const verifytoken=((req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    const valid = jwt.verify(token,secretkey)
    req.user=valid
    next()

})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
  
        cb(null,  file.originalname );
  
    }
  });

const upload = multer({storage:storage});


app.get("/",(req,res)=>{
    res.send("hello")
})

app.post('/newtuser',async(req,res)=>{
    const {username,pass,phone,college} = req.body;
    const check = await tnew.find({"phone":phone});
    const result = check.length
    const hashpass = await bcrypt.hash(pass,10)
    const data = {
        username:username,
        phone:phone,
        college:college,
        hashpass:hashpass
    }
    if(result == 0){
        let a = "false"
        try{
            const entry = new tnew(data);
            await entry.save();
            console.log("success")
            a="true"
        }catch{
            (err)=>{
                console.log(err)
            }
        }
        if(a=="true"){
            res.json({
                status:"success",
                message:'done'
            })
        }
        else{
            res.json({
                status:"error",
                message:'failed'
            })
        }
       
    }
    else{
        res.json({
            status:"error",
            message:"user already exist with same number"
        })
    }

})

app.post('/newstudent',async(req,res)=>{
    const {username,phone,pass} = req.body;
    const check = await snew.find({"phone":phone});
    const result = check.length
    const hashpass = await bcrypt.hash(pass,10)
    const data = {
        username:username,
        phone:phone,
        hashpass:hashpass
    }
    if(result == 0){
        let a = "false"
        try{
            const entry = new snew(data);
            await entry.save();
            console.log("success")
            a="true"
        }catch{
            (err)=>{
                console.log(err)
            }
        }
        if(a=="true"){
            res.json({
                status:"success",
                message:'done'
            })
        }
        else{
            res.json({
                status:"error",
                message:'failed'
            })
        }
       
    }
    else{
        res.json({
            status:"error",
            message:"user already exist with same number"
        })
    }
})

app.post('/deleteclass',async(req,res)=>{
    const clss = req.body.classn
    const teachername=req.body.user
    const teacherphone=req.body.phone
    let a = "false"
    try{
        
        await classmodel.deleteMany({"class":clss,"teacher":teachername,"teacherphone":teacherphone})
        console.log("success")
       a="true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }


})

app.post('/deleteclassa',async(req,res)=>{
    const clss = req.body.classn
    let a = "false"
    const teachername=req.body.tname
    const teacherphone=req.body.phone
    console.log(clss,teachername,teacherphone)
    try{
        await classmodel.deleteMany({"class":clss,"teacher":teachername,"teacherphone":teacherphone})
        console.log("success")
        a = "true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }

})

app.post('/deleteteachera',async(req,res)=>{
    let a = "false"
    const teachername=req.body.tname
    const teacherphone=req.body.phone
    try{
        await tnew.deleteOne({"username":teachername,"phone":teacherphone})
        await classmodel.deleteMany({"teacher":teachername,"teacherphone":teacherphone})
        console.log("success")
        a = "true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
})

app.post('/deletecollegea',async(req,res)=>{
    const {clg}=req.body
    let a = "false"
    try{
        await classmodel.deleteMany({"college":clg})
        console.log("success") 
        a="true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
})




app.post('/removeresult',async(req,res)=>{
    let a = "false"
    const clss = req.body.classn
    const teachername=req.body.user
    const teacherphone=req.body.phone
    try{
        await classmodel.updateMany({"class":clss,"teacher":teachername,"teacherphone":teacherphone},{"prmark":"nil","psmark":"nil","limark":"nil","atmark":"nil","asmark":"nil"})
        a = "true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
})


app.post('/removeresulta',async(req,res)=>{
    let a = " false"
    const clss = req.body.classn
    const teachername=req.body.tname
    const teacherphone=req.body.phone
    try{
        await classmodel.updateMany({"class":clss,"teacher":teachername,"teacherphone":teacherphone},{"prmark":"nil","psmark":"nil","limark":"nil","atmark":"nil","asmark":"nil"})
        a = "true"
    }catch(err){
        console.log("failed")
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
})


app.post("/classupload",upload.single('xl'),async(req,res)=>{
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    let a = "false"
    const clss = req.body.classn
    const teachername=req.body.user
    const teacherphone=req.body.phone
    const tdetail = await tnew.findOne({"username":teachername,"phone":teacherphone})
    const college = tdetail.college
    console.log(college,tdetail)
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        data.rollno=no;
        data.class=clss;
        data.teacher=teachername;
        data.college=college;
        data.teacherphone=teacherphone;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            const entry = new classmodel(d[i])
            await entry.save()
            console.log('success')
            a="true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"success",
            message:'done'
        })
    }
    console.log(d)
})

app.post("/updatepass",async(req,res)=>{
    let a = "false"
    const {sname,sphone,upass} = req.body
    const hashpass = await bcrypt.hash(upass,10)
        try{
            await snew.updateOne({"username":sname,"phone":sphone},{"hashpass":hashpass})
            console.log('success')
            a="true"
        }catch(err){
            console.log("failed")
        }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'done'
        })
    }
})


app.post("/classuploada",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const {classn,clgn} = req.body
    const teachername=req.body.tname
    const teacherphone=req.body.phone
    const college = clgn
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        data.rollno=no;
        data.class=classn;
        data.teacher=teachername;
        data.college=college;
        data.teacherphone=teacherphone;})
    console.log(d.length)
    for(i=0;i<d.length;i++){
        try{
            const entry = new classmodel(d[i])
            await entry.save()
            console.log('success')
            a = "true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/uploadresulta",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const phone = req.body.phone
    const teachername=req.body.tname
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.pr.toString()
        const no2 = data.ps.toString()
        const no3 = data.at.toString()
        const no4 = data.as.toString()
        const no5 = data.li.toString()
        data.rollno=no;
        data.pr=no1;
        data.ps=no2;
        data.at=no3;
        data.as=no4;
        data.li=no5;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"prmark":d[i].pr,"psmark":d[i].ps,"atmark":d[i].at,"asmark":d[i].as,"limark":d[i].li})
            a ="true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})


app.post("/uploadentireresult",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const phone = req.body.phone
    const teachername=req.body.user
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.pr.toString()
        const no2 = data.ps.toString()
        const no3 = data.at.toString()
        const no4 = data.as.toString()
        const no5 = data.li.toString()
        data.rollno=no;
        data.pr=no1;
        data.ps=no2;
        data.at=no3;
        data.as=no4;
        data.li=no5;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"prmark":d[i].pr,"psmark":d[i].ps,"atmark":d[i].at,"asmark":d[i].as,"limark":d[i].li})
            console.log('success')
            a = "true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/projectreview",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const teachername=req.body.user
    const phone=req.body.phone
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.pr.toString()
        data.rollno=no;
        data.pr=no1;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"prmark":d[i].pr})
            console.log('success')
            a="true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/attendencemark",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const teachername=req.body.user
    const phone=req.body.phone
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.at.toString()
        data.rollno=no;
        data.at=no1;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"atmark":d[i].at})
            console.log('success')
            a="true"
        }catch(err){
            console.log("failed")
        }
    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/projectsubmission",upload.single('xl'),async(req,res)=>{
    let a = " false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const teachername=req.body.user
    const phone=req.body.phone
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.ps.toString()
        data.rollno=no;
        data.ps=no1;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"psmark":d[i].ps})
            console.log('success')
            a = "true"
        }catch(err){
            console.log("failed")
        }

    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/assessment",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const teachername=req.body.user
    const phone=req.body.phone
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.as.toString()
        data.rollno=no;
        data.as=no1;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"asmark":d[i].as})
            console.log('success')
            a = "true"
        }catch(err){
            console.log("failed")
        }

    }
    if(a=="true"){
        res.json({
            status:"success",
            message:'done'
        })
    }
    else{
        res.json({
            status:"failed",
            message:'error'
        })
    }
    console.log(d)
})

app.post("/linkedin",upload.single('xl'),async(req,res)=>{
    let a = "false"
    const fpath = path.join(__dirname,'uploads',req.file.filename)
    const clss = req.body.classn
    const teachername=req.body.user
    const phone = req.body.phone
   const file = excel.readFile(fpath)
    const d = excel.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[0]])
    d.map((data)=>{
        const no = data.rollno.toString()
        const no1 = data.li.toString()
        data.rollno=no;
        data.li=no1;
        data.class=clss;
        data.teacher=teachername;})
    console.log(d.length)
    for(var i=0;i<d.length;i++){
        try{
            await classmodel.updateOne({"rollno":d[i].rollno,"student":d[i].student,"class":d[i].class,"teacher":d[i].teacher,"teacherphone":phone},{"limark":d[i].li})
            console.log('success')
            a = "true"
        }catch(err){
            console.log("failed")
        }
    }
    
    console.log(d)
})

app.post("/admincheck",async (req,res)=>{
    const {username,pass} = req.body;
    const a = username
    try{
        const data = await anew.find({'username':a})
        const user = data[0]
        const username = user.username
        const passdb = user.pass
        if(pass==passdb){
            const token = jwt.sign({"username":username},secretkey)
            res.json({
                status:'success',
                message:"done",
                token:token
            })
        }
        else{
            res.json({
                status:'failed',
                message:'enter valid details'
            })

        }
    }
    catch{(err)=>{
        res.json({
            status:'failed',
            message:'try again'
        })
    }}
})


app.post("/tlogincheck",async (req,res)=>{
    const {phone,pass} = req.body;
    try{
        const data = await tnew.find({'phone':phone})
        const user = data[0]
        const username = user.username
        const hashpass = user.hashpass
        const valid = bcrypt.compare(pass,hashpass)
        if(valid){
            const token = jwt.sign({"phone":phone,"username":username},secretkey)
            res.json({
                status:'success',
                message:"done",
                token:token
            })
        }
        else{
            res.json({
                status:'failed',
                message:'enter valid details'
            })

        }
    }
    catch{(err)=>{
        res.json({
            status:'failed',
            message:'try again'
        })
    }}
})

app.post("/slogincheck",async (req,res)=>{
    const {phone,pass} = req.body;
    try{
        const data = await snew.find({'phone':phone})
        const user = data[0]
        const username = user.username
        const hashpass = user.hashpass
        const valid = bcrypt.compare(pass,hashpass)
        if(valid){
            const token = jwt.sign({"username":username},secretkey)
            res.json({
                status:'success',
                message:"done",
                token:token
            })
        }
        else{
            res.json({
                status:'failed',
                message:'enter valid details'
            })

        }
    }
    catch{(err)=>{
        res.json({
            status:'failed',
            message:'try again'
        })
    }}
})


app.get("/userverification",verifytoken,(req,res)=>{
    const userphone = req.user.phone
    const user=req.user.username
    console.log(user)
    if(user){
        res.json({
            status:"success",
            username:user,
            phone:userphone
    })}
else{
    res.json({
        status:"failed",
        message:"unknowns"
    })

}

})

app.post("/viewteachera",async(req,res)=>{
    const college = req.body.clg
            try{
            const sdata = await tnew.find({"college":college})
            res.json({
                "status":"success",
                "data":sdata
            })
        }catch(err){
            console.log('failed')
        }
})

app.post("/viewstudenta",async(req,res)=>{
    const {clg,classn}= req.body
            try{
            const sdata = await classmodel.find({"college":clg,"class":classn})
            res.json({
                "status":"success",
                "data":sdata
            })
        }catch(err){
            console.log('failed')
        }
})


app.post("/viewresultadmin",async(req,res)=>{
    const clss = req.body.classn
    const clg =req.body.clg
            try{
            const sdata = await classmodel.find({"class":clss,"college":clg})
            res.json({
                "status":"success",
                "data":sdata
            })
        }catch(err){
            console.log('failed')
        }
})

app.post("/viewresultstudent",async(req,res)=>{
    const roll = req.body.roll
    const clg =req.body.clg
    const classn =req.body.classn
            try{
            const sdata = await classmodel.find({"rollno":roll,"college":clg,"class":classn})
            res.json({
                "status":"success",
                "data":sdata
            })
        }catch(err){
            console.log('failed')
        }
})



app.post("/viewclassresult",async(req,res)=>{
    const clss = req.body.classn
    const teachername=req.body.user
    const phone=req.body.phone
            try{
            const sdata = await classmodel.find({"class":clss,"teacher":teachername,"teacherphone":phone})
            res.json({
                "status":"success",
                "data":sdata
            })
        }catch(err){
            console.log('failed')
        }
})

app.post("/updateteacherandnumbera", async(req,res)=>{
    let a = "false"
    const{ptname,pphone,tname,clg,phone,tnamec,tphonec}=req.body
    try{
    if(tnamec=="true" && tphonec=="true"){
        await tnew.updateOne({"username":ptname,"phone":pphone,"college":clg},{"username":tname,"phone":phone})
        await classmodel.updateMany({"teacher":ptname,"teacherphone":pphone,"college":clg},{"teacher":tname,"teacherphone":phone})
    }
    else{
        if(tnamec=="true" && tphonec=="false"){
            await tnew.updateOne({"username":ptname,"phone":pphone,"college":clg},{"username":tname})
            await classmodel.updateMany({"teacher":ptname,"teacherphone":pphone,"college":clg},{"teacher":tname})
        }
        else if(tnamec=="false" && tphonec=="true"){
            await tnew.updateOne({"username":ptname,"phone":pphone,"college":clg},{"phone":phone})
            await classmodel.updateMany({"teacher":ptname,"teacherphone":pphone,"college":clg},{"teacherphone":phone})
        }
    }
    a="true"
}catch(err){
    console.log("failed")
}
if(a=="true"){
    res.json({
        status:"success",
        message:'done'
    })
}
else{
    res.json({
        status:"failed",
        message:'error'
    })
}
    
})


app.listen(3001,()=>{
    console.log("server started")
})