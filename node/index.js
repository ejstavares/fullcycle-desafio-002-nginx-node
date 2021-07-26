const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query('CREATE TABLE IF NOT EXISTS people  (id int not null auto_increment, name varchar(255) NULL, PRIMARY KEY (id))')
const sql = `insert into people(name) values('Ederlino JS Tavares')`
connection.query(sql)
connection.end()

app.get('/', async (req, res) => {
    console.log('================ List People ====================')
   
    let _resp = ''
    con = mysql.createConnection(config)
    await con.query("SELECT * FROM people order by id desc", function (err, result, fields) {
        if (err) {
            _resp = err
            console.log('============== ERROR ======================')
            res.send(`<h1>Full Cycle Rocks!</h1><p>Oops! ${err}</p>`)
        } else{
            _resp = result
            console.log('============== SUCCESS ======================')
            var content ='<thead><tr style="border-collapse: collapse;"><th>ID</th><th>Name</th></tr></thead>'
            Object.keys(result).forEach(function(key) {
                content += `<tr style="border-collapse: collapse;"><td>${result[key].id}</td><td>${result[key].name}</td></tr>`;
              });
            res.send(`<h1>Full Cycle Rocks!</br> <span style="font-size:12px;color:#666666;">Desafio Nginx com Node.js</span></h1><p><a style="color:green" href="/new">New Record</a> <a style="color:red; margin-left:50px" href="/delete">Delete All</a></p> <p><table border="1" style="width:50%; border-collapse: collapse;">${content}</table></p>`)
        }
    })    
    con.end()
})


app.get('/new', async (req, res) => {
    console.log('============== New PEOPLE ======================')
    
    con = mysql.createConnection(config)
    con.query(sql)
    con.end()
    res.redirect('/')
})
app.get('/delete', async (req, res) => {
    console.log('============== Delete All PEOPLE ======================')
    
    con = mysql.createConnection(config)
    con.query('delete from people')
    con.end()
    res.redirect('/')
})

app.listen(port, () => {
    console.log('rodando na porta: '+ port)
})