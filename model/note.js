const path = require("path")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

// id , str , create time ,update time
const Note = sequelize.define("note", {
    text: {
        type: Sequelize.STRING
    }
});
module.exports.Note = Note;
