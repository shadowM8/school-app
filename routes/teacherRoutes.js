const router = require('express').Router()
// const TeacherController = require('../controller/teacherController')
const Model = require('../models')
const Teacher = Model.Teacher

router.get('/', (req, res) => {
    // TeacherController.showAll()
    //     .then(allTeacher => {
    //         res.send(allTeacher)
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    Teacher.findAll({
        include: [Model.Subject]
    })
        .then(allTeacher => {
            // res.send(allTeacher)
            res.render('teacherData', { allTeacher })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/add/', (req, res) => {
    Model.Subject.findAll()
    .then(allData=>{
        res.send(allData)
        let dataForAdd = {
                        error: req.query.errornih,
                        data : allData
                    }
                    res.render('teacherForm', dataForAdd)

    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/addz/', (req, res) => {
    res.send(req.query)
})

router.post('/add/', (req, res) => {
    let newTeacher = req.body
    Teacher.create({
        firstName: newTeacher.firstName,
        lastName: newTeacher.lastName,
        email: newTeacher.email,
        subjectId: newTeacher.subjectId
    })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch(err => {
            // res.send(`${err.errors[0].message}`)
            res.redirect(`/teachers/add/?errornih=${err.errors[0].message}`)
        })
})

router.get('/:id', (req, res) => {
    Teacher.findByPk(req.params.id)
        .then(teacher => {
            return teacher.getSubject()
        })
        .then(subject => {
            res.send(subject)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/edit/:id', (req, res) => {
    Teacher.findByPk(req.params.id)
        .then(teacher => {
            let fullname = teacher.getFullName()
            // res.send(`${teacher.getFullName()}`)
            res.render('teacherFormEdit', { teacher, fullname })
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/edit/:id', (req, res) => {
    let editedTeacher = req.body
    Teacher.update({
        firstName: editedTeacher.firstName,
        lastName: editedTeacher.lastName,
        email: editedTeacher.email,
        subjectId: editedTeacher.subjectId,
        id : req.params.id
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/delete/:id', (req, res) => {
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = router


// Teacher.findAll({
//     include: Model.Subject
// })
//     .then(allData => {
//         let newData = allData.map(data => {
//             return new Promise((resolve, reject) => {
//                 data.getSubject()
//                     .then(subjectData => {
//                         data['subjectName'] = subjectData
//                         resolve(data)
//                     })
//                     .catch(err => {
//                         reject(err)
//                     })
//             })
//         })
//         return Promise.all(newData)
//     })
//     .then(promiseResult => {
//         // res.send(promiseResult)
//         let dataForAdd = {
//             error: req.query.errornih,
//             // data : promiseResult.subject.name
//         }
//         res.render('teacherForm', dataForAdd)
//     })
//     .catch(err => {
//         res.send(err)
//     })