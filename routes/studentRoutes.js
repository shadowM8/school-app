const router = require('express').Router()
const Model = require('../models')
const Student = Model.Student

router.get('/', (req, res) => {
    // res.send('ini studdent')
    Student.findAll({
        include : Model.Subject
    })
        .then(allStudentData => {
            res.render('studentData', { allStudentData })
            // res.send(allStudentData)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:id/add-subject', (req, res) => {
    let studentData = null
    Student.findByPk(req.params.id)
        .then(student => {
            studentData = student
            return Model.Subject.findAll()
        })
        .then(allSubjectData => {
            res.render('addSubjectToStudent', { allSubjectData, studentData })
        })
        .catch(err=>{
            res.send(err)
        })
})

router.post('/:id/add-subject', (req,res)=>{
    Model.StudentSubject.create({
        subjectId : req.body.subjectId,
        studentId : req.params.id
    })
    .then(()=>{
        res.redirect('/students')
    })
    .catch(err=>{
        res.send(err)
    })
})



module.exports = router