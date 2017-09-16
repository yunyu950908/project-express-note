const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

// id , str , create time ,update time
const Note = sequelize.define("note", {
    text: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    }
});

Note.sync();
// Note.drop();


// Note.sync({force: true});
// // force: true will drop the table if it already exists
// Note.sync({force: true}).then(function () {
//   // Table created
//   return Note.create({
//     text: 'hello world'
//   });
// });

// Note.destroy({where:{text:'haha'}}, function(){
//   console.log('destroy...')
//   console.log(arguments)
// })
// Note.findAll({raw: true}).then(function(articles) {
//   console.log(articles)
// })

module.exports.Note = Note;
