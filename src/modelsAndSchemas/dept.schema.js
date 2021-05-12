const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name : String,
    code : String,
});

module.exports = DepartmentSchema;