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
const Author = require('./author')(sequelize);
const Book = require('./book')(sequelize);
const Category = require('./category')(sequelize);
const BookCategory = require('./bookCategory')(sequelize);
const AuthorBook = require('./authorBook')(sequelize);
const Rewive = require('./rewive')(sequelize);
const Favorite = require('./favorite')(sequelize)
/*
Book and Category
 */
Book.hasMany(BookCategory, {foreignKey:'book_id'});
BookCategory.belongsTo(Book,{foreignKey:'book_id'});

Category.hasMany(BookCategory, {foreignKey:'category_id'});
BookCategory.belongsTo(Category,{foreignKey:'category_id'});


/*
Author and Books
 */

Book.hasMany(AuthorBook, {foreignKey:'book_id'});
AuthorBook.belongsTo(Book,{foreignKey:'book_id'});

Author.hasMany(AuthorBook, {foreignKey:'author_id'});
AuthorBook.belongsTo(Author,{foreignKey:'author_id'});

/*
Rewives
 */

Book.hasMany(Rewive, {foreignKey:'book_id'});
Rewive.belongsTo(Book,{foreignKey:'book_id'});

User.hasMany(Rewive, {foreignKey:'user_id'});
Rewive.belongsTo(User,{foreignKey:'user_id'});

/*
Favorite
 */

Book.hasMany(Favorite, {foreignKey:'book_id'});
Favorite.belongsTo(Book,{foreignKey:'book_id'});

User.hasMany(Favorite, {foreignKey:'user_id'});
Favorite.belongsTo(User,{foreignKey:'user_id'});


(async ()=>{
    try{
        await sequelize.sync({});
        console.log("sync successful!")
    }
    catch (err){
        console.error(err);
    }

})();

module.exports = {
    User,
    Book,
    Category,
    BookCategory,
    Author,
    AuthorBook,
    Rewive,
    Favorite,
}
