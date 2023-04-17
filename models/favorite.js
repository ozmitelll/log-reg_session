const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('Favorites',{
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        book_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },{timestamps:false,});
}