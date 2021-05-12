const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name : String,
    code : String,
    credits : Number,
    grade : String
});

const SemesterSchema = new Schema({
    number : Number,
    totalcredits : Number,
    sgpa : Number,
    subjects : [SubjectSchema],
});

module.exports = SemesterSchema;