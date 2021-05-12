const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DepartmentSchema = require('./dept.schema.js');
const DegreeSchema = require('./degree.schema.js');
const SemesterSchema = require('./semester.schema.js');

const StudentSchema = new Schema({
    rollno : String,
    name : String,
    firstyearrollno : String,
    cgpa : Number,
    deptrank : Number,
    unirank : Number,
    currentsem : Number,
    batch: String,
    dept : DepartmentSchema,
    degree : DegreeSchema,
    semesters : [SemesterSchema],
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;