const express = require('express');
const Subject = require('../modelsAndSchemas/subject.model.js');
const router = express.Router();

const SELECTED_FIELDS = {
    _id : 0,
    __v: 0,
}

function sanitiseSubCode(code){
    return code.toUpperCase().trim().replace(/\s+/g, '');
}

function findSubjectFromSubCode(code, res){
    sanitisedSubCode = sanitiseSubCode(code);
    Subject.findOne({code : sanitisedSubCode}, SELECTED_FIELDS).lean().then((s) => {
        if(FLAGS.DEBUG){
            console.log(s);
        }
        res.send(s);
    });
}

router.get('/subject/:code', (req, res) => {
    if(FLAGS.DEBUG){
        console.log(req.params.code);
    }
    findSubjectFromSubCode(req.params.code, res);
});

router.post('/subject', (req, res) => {
    if(FLAGS.DEBUG){
        console.log(req.body.code);
    }
    findSubjectFromSubCode(req.body.code, res);
});

module.exports = router;