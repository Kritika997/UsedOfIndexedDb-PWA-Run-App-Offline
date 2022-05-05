const db = require('../database/connection');

const Schema = db.Schema;
const Model = db.model;

const usersTableSchema = new Schema({
    title: {type: String, required: true}, 
    content: {type: String, required: true},  
    done: {type: Boolean, required: true}
});

module.exports = Model('Todo', usersTableSchema);
