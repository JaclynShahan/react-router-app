const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios');
const r = require('rethinkdb');
require('dotenv').config()


app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];

let connection;
r.connect( {
    host: `${process.env.serverip}`, 
    port:  `${process.env. rethinkdbport}`,    
    db: 'jaclyn',
    user: `${process.env.rethinkdbuser}`,
    password: `${process.env.rethinkdbpw}`
    }, function(err, conn) {
    if (err) console.log('error in connection: ', err)
    console.log(`here is conn: ${conn}`)
    connection = conn;
    app.set('reThinkDB', conn)
})

setTimeout(() => {
    console.log('Connected to rethinkdb server: ', connection.host)
}, 3000)


app.get('/api/getUser', (req, res) => {
    console.log(req.query)
    r.table('Users').filter(function (user) {
        return user("email").eq(req.query.email);
    }).run(connection, (err, cursor) => {
        if (err) console.log(err)
        cursor.toArray(
            (err, data) => {
                if(data.length == 0){
                    res.status(200).send('Not Found');
                } else {
                res.status(200).send(data)
                console.log(data)
                }
            })
    })
})

app.post('/api/addUser', (req, res) => {
    console.log(req.body)
    r.table('Users').insert(req.body)
    .run(connection, (err, data) => {
        console.log(res.status)
    }) 
})


const port = 4001;
app.listen(port, () => console.log(`Server listening on port ${port}`))