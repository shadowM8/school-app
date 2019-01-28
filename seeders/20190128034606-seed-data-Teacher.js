'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Teachers', [{
     firstName : "Bambang",
     lastName : "Suprapto",
     email : "bambangsuprapto@sekolah.id",
     createdAt : new Date,
     updatedAt : new Date,
     subjectId : null
   },
   {
    firstName : "Rukmana",
    lastName : "Fatmawati",
    email : "rukmanafatmawati@sekolah.id",
    createdAt : new Date,
    updatedAt : new Date,
    subjectId : null
  },
  {
    firstName : "Butet",
    lastName : "Naiborhu",
    email : "butetnaiborhu@sekolah.id",
    createdAt : new Date,
    updatedAt : new Date,
    subjectId : null
  },
  {
    firstName : "Yulius",
    lastName : "Prawiranegara",
    email : "yuliusprawiranegara@sekolah.id",
    createdAt : new Date,
    updatedAt : new Date,
    subjectId : null
  }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Teachers', null, {})
  }
};
