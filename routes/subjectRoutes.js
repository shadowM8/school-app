const router = require('express').Router()
const Model = require('../models')
const Subject = Model.Subject

// router.get('/', (req,res)=>{
//     Subject.findAll({
//         include : Model.Teacher
//     })
//         .then(subjectData=>{
//             // res.send(subjectData)
//             res.render('subjectData',{subjectData})
//         })
//         .catch(err=>{
//             res.send(err)
//         })
// })

router.get('/', (req,res)=>{
    Subject.findAll()
        .then(arraySubjectData=>{
            let newArraySubjectData = arraySubjectData.map(subjectData=>{
                return new Promise((resolve,reject)=>{
                    subjectData.getTeachers()
                        .then(arrayTeacher=>{
                            subjectData['Teachers'] = arrayTeacher
                            resolve(subjectData)
                        })
                        .catch(err=>{
                            reject(err)
                        })
                })
            })
            return Promise.all(newArraySubjectData)
        })
        .then(promiseResult=>{
            // res.send(promiseResult)
            res.render('subjectData',{subjectData : promiseResult})
        })
        .catch(err=>{
            res.send(err)
        })
})

router.get('/:id/enrolled-students', (req,res)=>{
    let subject = null
    Subject.findByPk(req.params.id)
        .then(subjectData=>{
            subject = subjectData
            return subjectData.getStudents()
        })
        .then(arrayStudents=>{
            // res.send(arrayStudents)
            res.render('addScoreToStudent',{subject, arrayStudents})
        })
        .catch(err=>{
            res.send(err)
        })
})

router.get('/:id/give-score', (req,res)=>{
    Model.StudentSubject.findByPk(req.params.id)
        .then(studentSubjectData=>{
            // res.send(studentSubjectData)
            res.render('giveScoreForm', {studentSubjectData})
        })
        .catch(err=>{
            res.send(err)
        })
})

router.post('/:id/give-score', (req,res)=>{
    let newScore = req.body
    Model.StudentSubject.update({
        score : newScore.score
    }, {
        where : {
            id : req.params.id
        }
    })
        .then(()=>{
            return Model.StudentSubject.findByPk(req.params.id)
        })
        .then((result)=>{
            res.redirect(`/subjects/${result.subjectId}/enrolled-students`)
        })
        .catch((err)=>{
            res.send(err)
        })
})

module.exports = router