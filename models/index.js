const { Sequelize } = require('sequelize');
const db_config = require('../config/db.config');
const sequelize = new Sequelize(db_config.database, db_config.username,db_config.password, db_config.options);

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("seq - +")
    }
    catch (err){
        console.error(err);
    }

})();

const User = require('./user')(sequelize);

(async ()=>{
    try{
        await sequelize.sync();
        console.log("sync successful!")
    }
    catch (err){
        console.error(err);
    }

})();

module.exports = {
    User,
}
