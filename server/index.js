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
let posts = [];

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

getPosts = (res) => {
    r.table('Posts').run(connection, (err, cursor) => {
        if (err) console.log(err)
        cursor.toArray(
            (err, data) => {
                res.status(200).send(data)
            }
        )
    })
}
app.get('/api/getPosts' , (req, res) => {
    getPosts(res)
})
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
app.get('/api/getPosts', (req, res) => {
   console.log(req.query)
    r.table('Posts').filter(function (post) {
     return post("text").eq(req.query.text);
    }).run(connection, (err, cursor) => {
        if (err) console.log(err)
        cursor.toArray(
            (err, data) => {
               if(data.length == 0) {
                    res.status(200).send('Not Found');
                } else {
                  res.status(200).send(data)
                    console.log(data)
                }
            }
        )
    })
})

//app.put('/api/updatePosts', (req, res) => {
  //  console.log(req.body)
    //r.table('Posts').get(req.body.id).update({posts: req.body.tempArr}).run(connection, (err, data) => {
    //console.log(data)
    //getPost(res)
//})
//})
app.post('/api/addUser', (req, res) => {
    console.log(req.body)
    r.table('Users').insert(req.body)
    .run(connection, (err, data) => {
        console.log(data.generated_keys)
        r.table('Users').get(data.generated_keys[0])
        .run(connection, (err, userData) => {
            console.log(userData)
            res.status(200).send(userData)
           // cursor.toArray(
             //   (err, userData) => {
               //     console.log(userData)
               // }
           // )
        })
    }) 
})
app.post('/api/createPost', (req, res) => {
    console.log(req.body)
    r.table('Posts').insert(req.body)
    .run(connection, (err, data) => {
        console.log(data.generated_keys)
        r.table('Posts').get(data.generated_keys[0])
        .run(connection, (err, postData) => {
            console.log(postData)
            // res.status(200).send(postData)
            getPosts(res)
        })
    })
})
app.delete('api/deletePost/:id', (req, res) => {
    console.log(req.params)
    r.table('Posts').get(req.params.id).delete().run(connection, (err, data) => {
        console.log(data)
        getPosts(res)
    })
})


const port = 4001;
app.listen(port, () => console.log(`Server listening on port ${port}`))