'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tests',{
      id:{
        type:Sequelize.INTEGER(11),
        autoIncrement:true,
        primaryKey:true
      },
      username:Sequelize.STRING(50),
      password:Sequelize.STRING(50),
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tests');
  }
};
