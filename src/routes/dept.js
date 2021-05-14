const express = require('express');
const Student = require('../modelsAndSchemas/student.model.js');
const router = express.Router();

const MAX_STUDENTS = 25
const SELECTED_FIELDS = {
    name : 1,
    cgpa : 1,
    deptrank : 1,
    unirank : 1,
    rollno : 1,
    _id : 0
}

function getStudentsByRank(code, index, order, res){
    Student.find({'dept.code' : code.toString()}, SELECTED_FIELDS).sort({'deptrank' : order}).skip(index * MAX_STUDENTS).limit(MAX_STUDENTS).lean().then((students) => {
        if(students.length >= 0){
            if(FLAGS.DEBUG){
                console.log(students);
            }
            res.send(students);
        }
    });
}

function getStudentsByRollNumber(code, index, order, res){
    Student.find({'dept.code' : code.toString()}, SELECTED_FIELDS).sort({'rollno' : order}).skip(index * MAX_STUDENTS).limit(MAX_STUDENTS).lean().then((students) => {
        if(students.length >= 0){
            if(FLAGS.DEBUG){
                console.log(students);
            }
            res.send(students);
        }
    });
}

router.post('/department/:code/:index', (req, res) => {
    switch(req.body.sortBy){
        case 'Rank':
            getStudentsByRank(req.params.code, parseInt(req.params.index), req.body.order, res);
            break;
        case 'RollNo':
        default:
            getStudentsByRollNumber(req.params.code, parseInt(req.params.index), req.body.order, res);
            break;
    } 
});

module.exports = router;