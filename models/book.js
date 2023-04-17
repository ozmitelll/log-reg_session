const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('Books',{
        book_id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        book_title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        book_name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        book_description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false,});
}