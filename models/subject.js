'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {foreignKey : 'subjectId'})
    /**
     * Subject jadi punya method :
     * 1. getTeachers
     * 2. setTeachers
     * 3. addTeachers
     * 4. removeTeachers
     */
    Subject.belongsToMany(models.Student, {through : models.StudentSubject, foreignKey : 'subjectId'})
  };
  return Subject;
};