const express = require("express")
const teacherRoutes = require('./routes/teacherRoutes.js')
const subjectRoutes = require('./routes/subjectRoutes')
const studentRoutes = require('./routes/studentRoutes')
const app = express()
const port = 3000

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get("/", (req,res)=>{
    res.render('index')
})

app.use("/teachers",teacherRoutes)
app.use("/subjects",subjectRoutes)
app.use("/students",studentRoutes)

app.listen(port, ()=>{
    console.log(`listen to port ${port}`)
})