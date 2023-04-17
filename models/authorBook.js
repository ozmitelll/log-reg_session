const DataTypes = require('sequelize');
module.exports = (sequelize)=>{
    return sequelize.define('AuthorBooks',{
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        book_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        author_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },{timestamps:false,});
}