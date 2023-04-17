const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('Categories',{
        category_id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        category_name:{
            type:DataTypes.STRING,
            unique:true,
            allowNull: false,
        },
    },{timestamps:false,});
}