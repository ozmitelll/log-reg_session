const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('BookCategories',{
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        book_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        category_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },{timestamps:false,});
}