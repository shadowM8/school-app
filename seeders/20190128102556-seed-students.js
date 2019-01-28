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
   return queryInterface.bulkInsert('Students', [{
    firstName : 'Akbar',
    lastName : 'Sahata',
    email : 'akbarsahata@mail.com',
    skor : null,
    createdAt : new Date,
    updatedAt : new Date,
   },{
    firstName : 'Agindo',
    lastName : 'Rahmat',
    email : 'agindorahmat@mail.com',
    skor : null,
    createdAt : new Date,
    updatedAt : new Date,
   },{
    firstName : 'Dul',
    lastName : 'Joni',
    email : 'duljoni@mail.com',
    skor : null,
    createdAt : new Date,
    updatedAt : new Date,
   },], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Students',null, {})
  }
};
