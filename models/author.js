const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('Author',{
        author_id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        author_name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false,});
}