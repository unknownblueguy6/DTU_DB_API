const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    code : String,
    name : String,
    credits : Number,
    total : Number, 
    average : Number,
    median : Number,
    grades : {
        'O' : Number,
        'A+' : Number,
        'A' : Number, 
        'B+' : Number, 
        'B' : Number,
        'C' : Number,
        'P' : Number,
        'F' : Number,
        'DT' : Number,
        'RW' : Number,
        'RL' : Number,
        'AB' : Number,
        'I' : Number,
        'UFM' : Number,
    },
});

const Subject = mongoose.model('subject', SubjectSchema);

module.exports = Subject;