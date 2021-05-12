const express = require('express');
const Subject = require('../modelsAndSchemas/subject.model.js');
const router = express.Router();

function sanitiseSubCode(code){
    return code.toUpperCase().trim().replace(/\s+/g, '');
}

function findSubjectFromSubCode(code, res){
    sanitisedSubCode = sanitiseSubCode(code);
    Subject.findOne({code : sanitisedSubCode}).then((s) => {
        console.log(s);
        res.send(s);
    });
}

router.get('/subject/:code', (req, res) => {
    console.log(req.params.code);
    findSubjectFromSubCode(req.params.code, res);
});

router.post('/subject', (req, res) => {
    console.log(req.body.code);
    findSubjectFromSubCode(req.body.code, res);
});

module.exports = router;