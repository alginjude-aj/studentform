// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "alginjude",
//     database: "db_students",
// });



// app.post("/api/student", (req,res) => {
    
// //     const sql = "SELECT * FROM db_students";
// //     db.query(sql, (err, data) =>{ 
// //         if(err) return app.json("error");
// //         return app.json(data);
// //     })
// // })

//         const studentname = req.body.studentname;
//         const age = req.body.age;
//         const gender = req.body.gender;
//         const rank = req.body.rank;

//     db.query(
//         "INSERT INTO tbl_student (student_name, age, gender, rank) VALUES (?,?,?,?)"
//         [studentname, age, gender, rank], (err, result) =>{
//             console.log(err);
//         });
// });

// app.listen(3001, () => {
//     console.log("server running on port 3001")
// });












const express = require("express");
const mysql = require("mysql2");
const cors = require ('cors');
const bodyParser = require ('body-parser');


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alginjude",
    database: "db_students",
});

app.post('/student', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    const { studentname, age, gender, score } = req.body;

   
    db.query("INSERT INTO tbl_student (student_name, age, gender, score) VALUES (?,?,?,?)",
        [studentname, age, gender, score], 
        (err, result) => {
        console.log(err);
        
    });
});

app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;

    db.query('SELECT * FROM tbl_student', (err, result) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.sendStatus(500); // Send appropriate error response
      } else {
        res.json(result); // Send the fetched student data as JSON response
      }
    });
  });
  
  app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
  
    db.query('DELETE FROM tbl_student WHERE id = ?', [studentId], (err, result) => {
      if (err) {
        console.error('Error deleting student:', err);
        res.sendStatus(500); // Send appropriate error response
      } else {
        res.sendStatus(200); // Send success status
      }
    });
  });
  
  app.put('/api/students/:id', (req, res) => {
        const studentId = req.params.id;
        const {student_name, age, gender, score} = req.body;

        db.query('UPDATE tbl_student SET student_name = ?, age = ?, gender = ? , score = ? WHERE id = ?',
        [ student_name, age, gender, score, studentId],
        (err, result) => {
            if (err) {
              console.error('Error updating student:', err);
              res.sendStatus(500); // Send appropriate error response
            } else {
              res.sendStatus(200); // Send success status
            }
          });
  })

app.listen(3001, () => {
    console.log("server up");
});