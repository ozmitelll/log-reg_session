const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('Rewives',{
        rewive_id: {
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
        description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false,});
}