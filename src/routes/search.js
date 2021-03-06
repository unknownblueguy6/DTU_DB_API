const express = require('express');
const Student = require('../modelsAndSchemas/student.model.js');
const Subject = require('../modelsAndSchemas/subject.model.js');
const router = express.Router();

const ROLL_NO_LENGTH = 3;
const YEAR_IND = 0;
const BRANCH_IND = 1;
const ROLL_NO_IND = 2;

const YEAR_PREFIX = '2K';

const STUDENT_SELECTED_FIELDS = {
    name:1,
    rollno:1,
    cgpa: 1,
    dept : {name : 1, code:1},
    _id : 0
}

const SUBJECT_SELECTED_FIELDS = {
    name : 1,
    code : 1,
    _id : 0
}

function isValidRollNo(rollno){
    const rn_arr = rollno.split('/');
    if (rn_arr.length != ROLL_NO_LENGTH) return false;
    if (!rn_arr[YEAR_IND].startsWith(YEAR_PREFIX)) return false 
    if (isNaN(rn_arr[YEAR_IND].slice(YEAR_PREFIX.length))) return false;
    if (isNaN(rn_arr[ROLL_NO_IND])) return false;
    return true;
}

function findSubjects(search, res){
    if(FLAGS.DEBUG){
        console.log(search);
    }
    search = search.trim();
    const searchRegex = RegExp('\\b' + search, 'i');
    const query = Subject.find();
    query.or([{name : searchRegex}, {code : searchRegex}]);
    query.select(SUBJECT_SELECTED_FIELDS);
    query.lean();
    query.then((subjects) =>{
        if(subjects.length >= 0){
            if(FLAGS.DEBUG){
                console.log(subjects);
            }
            res.send(subjects);
        }
    });
}

function findStudents(search, filters, res){
    if(FLAGS.DEBUG){
        console.log(search);
    }
    search = search.trim();
    const sanitisedSearch = search.toUpperCase().trim().replace(/\s+/g, '');
    
    const query = Student.find();
    if (isValidRollNo(sanitisedSearch)){
        query.or([{rollno : sanitisedSearch}, {firstyearrollno : sanitisedSearch}]);
    }
    else{
        const searchRegEx = RegExp('\\b' + search, 'i');
        if(filters !== undefined){
            filters.name = searchRegEx;
        }
        else filters = {name : searchRegEx};
        query.and(filters);
    }
    query.select(STUDENT_SELECTED_FIELDS);
    query.lean();
    query.then((students) => {
        if(students.length >= 0){
            if(FLAGS.DEBUG){
                console.log(students);
            }
            res.send(students);
        }
    });
}

router.post('/search', (req, res) => {
    switch(req.body.searchType){
        case 'Subject':
            findSubjects(req.body.search, res);
            break;
        case 'Student':
        default:
            findStudents(req.body.search, req.body.filters, res);
    }
});

module.exports = router;