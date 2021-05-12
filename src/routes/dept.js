const express = require('express');
const Student = require('../modelsAndSchemas/student.model.js');
const router = express.Router();

const MAX_STUDENTS = 25

function getStudentsByRank(code, index, order, res){
    Student.find({'dept.code' : code.toString()}, 'name cgpa deptrank unirank rollno').sort({'deptrank' : order}).skip(index * MAX_STUDENTS).limit(MAX_STUDENTS).then((students) => {
        if(students.length >= 0){
            console.log(students);
            res.send(students);
        }
    });
}

function getStudentsByRollNumber(code, index, order, res){
    Student.find({'dept.code' : code.toString()}, 'name cgpa deptrank unirank rollno').sort({'rollno' : order}).skip(index * MAX_STUDENTS).limit(MAX_STUDENTS).then((students) => {
        if(students.length >= 0){
            console.log(students);
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