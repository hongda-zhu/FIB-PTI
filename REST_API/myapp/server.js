const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Javascript es declarativo, si no se comenta esta linia, ejecuta el primero que se encuentra, no funciona la otra ruta de /students
// app.get("/students", (req, res, next) => {
//     res.send('Received request at /students')
// });

app.get('/students/:studentId', function (req, res) {
    res.send('Received request at /students with param studentId='+req.params.studentId)
})

app.get("/students", (req, res, next) => {  
    res.json({
        responseId: 1234,
        students: [
            {name: "Jordi", studentId: '12345678a'},
            {name: "Marta", studentId: '12345678b'}
    ]});
}); 

// curl -H "Content-Type: application/json" -d '{"name":"Fatima", "studentId":"234123412f"}' http://localhost:8000/newstudent
// -> 
app.post('/newstudent', (req, res, next) => {
    console.log(req.body.name);
    res.status(201);
    res.end(); 
}) 

// curl -i -H "Content-Type: application/json" -d '{"students": [{"name": "Fatima", "studentId": "234123412f"}, {"name": "Maria", "studentId":"16553412g"}]}' http://localhost:8000/newstudent 
// -> 

app.post('/newstudent', (req, res, next) => {
    for(var i in req.body.students){
        console.log(req.body.students[i].name+'\n');
    }
    res.status(201);
    res.end(); 
})

app.listen(port, () => {
  console.log(`PTI HTTP Server listening at http://localhost:${port}`)
})
