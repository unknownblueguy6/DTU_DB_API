# DTU DB API

A public REST API to query records of Delhi Technological University students.

Available at https://dtu-db-api.vercel.app

## API Endpoints

#### 1. /student
Returns all the information about a student.
```
GET /student/:year/:batch/:rollno
eg. GET /student/2K19/CO/281

            OR

POST /student
{
    rollno : ":year/:batch/:rollno"
}
eg. POST /student
{
    rollno : "2K19/CO/281
}
```

```
{
  "name": "PRANAV BHATNAGAR",
  "rollno": "2K19/CO/281",
  "firstyearrollno": "2K19/B2/39",
  "cgpa": 9.71,
  "deptrank": 7,
  "unirank": 10,
  "currentsem": 4,
  "batch": "2K19",
  "dept": {
    "name": "Computer Engineering",
    "code": "CO"
  },
  "degree": {
    "name": "Bachelor of Technology",
    "type": "UG",
    "duration": "4 YEARS"
  },
  "semesters": [
    {
      "number": 1,
      "totalcredits": 20,
      "sgpa": 9.4,
      "subjects": [
        {
          "name": "MATHEMATICS - I",
          "code": "MA101",
          "credits": 4,
          "grade": "O"
        },
        ...
      ]
    },
    ...
  ]
}
```


## Prerequisites
1. C++11 compiler


## Installation

1. Clone the repo.

```bash
$ git clone https://github.com/unknownblueguy6/MineSweeper.git
```

2. cd to the MineSweeper folder, and then build it using the Makefile.
   
   (Change the compiler in the Makefile, if required. Default compiler is g++)
   
```bash
$ cd MineSweeper
$ make
```

3. Run it.

```bash
$ ./mine
```

## TODO:

1. Update the gif with new controls
