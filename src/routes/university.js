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

function getStudentsByRank(index, order, res){
    Student.find({}, SELECTED_FIELDS).sort({'unirank' : order}).skip(index * MAX_STUDENTS).limit(MAX_STUDENTS).lean().then((students) => {
        if(students.length >= 0){
            if(FLAGS.DEBUG){
                console.log(students);
            }
            res.send(students);
        }
    });
}

router.post('/university/:index', (req, res) => {
    getStudentsByRank(parseInt(req.params.index), req.body.order, res);
});

module.exports = router;