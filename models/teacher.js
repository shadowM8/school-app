'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args :true,
          msg : "Validation error : email format is incorrect"
        },
        isUnique: function(value) {
          let self = this
           return Teacher.findOne({
              where: {
                email: value
              }
            })
              .then(function(result){
                if (result) {
                  if(result.id != self.id)
                  throw (`email is already used`)
                }
                
              })
              .catch((err) => {
                throw (err)
              })
          

        }
      }
    },
    subjectId : DataTypes.INTEGER
  }, {});

  //custom method model
  Teacher.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`
  }

  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, { foreignKey: 'subjectId' })
  };
  return Teacher;
};