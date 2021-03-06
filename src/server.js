require('dotenv').config();
require('./flags.js').setFlags(process.argv.slice(2));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const StudentRoute = require('./routes/student.js');
const SubjectRoute = require('./routes/subject.js');
const DepartmentRoute = require('./routes/dept.js');
const UniversityRoute = require('./routes/university.js')
const SearchRoute = require('./routes/search.js');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const server = process.env.MONGO_SERVER;
const database = process.env.MONGO_DATABASE;
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`);

app.use((req, res, next) => {
    if (FLAGS.DEBUG){
        console.log(`${new Date().toDateString()} => ${req.originalUrl}`);
    }
    next();
})

app.use(StudentRoute);
app.use(SubjectRoute);
app.use(DepartmentRoute);
app.use(UniversityRoute);
app.use(SearchRoute);

app.listen(port, () => {
    if (FLAGS.DEBUG){
        console.log(`Server listening at PORT : ${port}`)
    }
})