const Sequelize=require('sequelize');
const sequelize=require('../database/connection')

module.exports=sequelize.define('tests',{
    username:Sequelize.STRING(50),
    password:Sequelize.STRING(50)
})