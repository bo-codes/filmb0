'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert(
     "Images",
     [
       {
         userId: 1,
         title: "sleep",
         imageUrl:
           "https://direct.rhapsody.com/imageserver/images/alb.381206642/500x500.jpg",
         content: "null",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 1,
         title: "party",
         imageUrl:
           "https://direct.rhapsody.com/imageserver/images/alb.531610330/500x500.jpg",
         content: "null",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 1,
         title: "people",
         imageUrl:
           "https://direct.rhapsody.com/imageserver/images/alb.319378116/500x500.jpg",
         content: "null",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 2,
         title: "red light",
         imageUrl:
           "https://i.pinimg.com/564x/1e/9f/26/1e9f26ce96a09fe31ea555f4ef4743e9.jpg",
         content: "night out",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 2,
         title: "blue night",
         imageUrl:
           "http://www.c-heads.com/wp-content/uploads/2018/02/1P0A6552-2.jpg",
         content: "null",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userId: 2,
         title: "fight",
         imageUrl:
           "https://i.pinimg.com/originals/6a/3e/1d/6a3e1d8d2bc1b2c5bc8012c60747b748.jpg",
         content: "knock out",
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
   return queryInterface.bulkDelete('Images', null, {});
  }
};
