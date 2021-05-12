const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
    name : String,
    type : {type : String},
    duration : String,
});

module.exports = DegreeSchema;