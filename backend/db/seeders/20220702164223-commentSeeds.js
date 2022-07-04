'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert(
     "Comments",
     [
       {
         userId: 1,
         imageId: 4,
         comment: "bruh I. dont even know if this shit be working fr fr",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 1,
         imageId: 5,
         comment: "bruh I. dont even know if this shit be working fr fr",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 1,
         imageId: 6,
         comment: "bruh I. dont even know if this shit be working fr fr",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 2,
         imageId: 1,
         comment: "bruh I. dont even know if this shit be working fr fr",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 2,
         imageId: 2,
         comment: "bruh I. dont even know if this shit be working fr fr",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ],
     {}
   );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
