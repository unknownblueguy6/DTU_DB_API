const express = require('express');
const Student = require('../modelsAndSchemas/student.model.js');
const router = express.Router();

const ROLL_NO_LENGTH = 3
const YEAR_IND = 0
const BRANCH_IND = 1
const ROLL_NO_IND = 2

const YEAR_PREFIX = '2K'; //all roll numbers in DTU are of the form 2KXX eg. 2K19
const BRANCH_PREFIX = 'A' //first years can be in A or B eg. B2

const SELECTED_FIELDS = {
    _id: 0,
    __v: 0,
    dept: {_id:  0},
    degree : { _id: 0},
    semesters: { _id: 0, subjects: { _id: 0}}
};

function sanitiseRollNo(rollno){
    return rollno.toUpperCase().trim().replace(/\s+/g, '');
}

function isValidRollNo(rollno){
    const rn_arr = rollno.split('/');
    if (rn_arr.length != ROLL_NO_LENGTH) return false;
    if (!rn_arr[YEAR_IND].startsWith(YEAR_PREFIX)) return false 
    if (isNaN(rn_arr[YEAR_IND].slice(YEAR_PREFIX.length))) return false;
    if (isNaN(rn_arr[ROLL_NO_IND])) return false;
    return true;
}

function isFirstYearRollNo(rollno){
    return !isNaN(rollno.split('/')[BRANCH_IND].slice(BRANCH_PREFIX.length));
}

function correctLength(rollno, len){
    let pref = rollno.slice(0, rollno.lastIndexOf('/')+1);
    let suff = rollno.slice(rollno.lastIndexOf('/')+1);
    while (suff.length < len){
        suff = '0' + suff; 
    }
    return pref + suff;
}

function findStudentFromRollNo(rollno, res){
    let sanitisedRollNo = sanitiseRollNo(rollno);
    if (isValidRollNo(sanitisedRollNo)){
        if (isFirstYearRollNo(sanitisedRollNo)){
            sanitisedRollNo = correctLength(sanitisedRollNo, 2);
            Student.findOne({firstyearrollno : sanitisedRollNo}, SELECTED_FIELDS).lean().then((s) => {
                if(FLAGS.DEBUG){
                    console.log(s);
                }
                res.send(s);
            });
        }
        else{
            sanitisedRollNo = correctLength(sanitisedRollNo, 3)
            Student.findOne({rollno : sanitisedRollNo}, SELECTED_FIELDS).lean().then((s) => {
                if(FLAGS.DEBUG){
                    console.log(s);
                }
                res.send(s);
            });
        }
    }
}

router.get('/student/:year/:branch/:roll_no', (req, res) => {
    const rollno = `${req.params.year}/${req.params.branch}/${req.params.roll_no}`;
    if(FLAGS.DEBUG){
        console.log(rollno);
    }
    findStudentFromRollNo(rollno, res);
});

router.post('/student', (req, res) => {
    if(FLAGS.DEBUG){
        console.log(req.body.rollno);
    }
    findStudentFromRollNo(req.body.rollno, res);
});

module.exports = router;