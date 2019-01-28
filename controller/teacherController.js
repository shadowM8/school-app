const Model = require('../models')
const Teacher = Model.Teacher

class TeacherController {
    static showAll() {
        return new Promise((resolve, reject) => {
            Teacher.findAll()
                .then(allTeacher => {
                    resolve(allTeacher)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = TeacherController