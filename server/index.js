const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const r = require('rethinkdb')
require('dotenv').config()

app = express()
app.use(bodyParser.json())
app.use(cors())

let connection
r.connect(
  {
    host: `${process.env.serverip}`,
    port: `${process.env.rethinkdbport}`,
    db: 'jaclyn',
    user: `${process.env.rethinkdbuser}`,
    password: `${process.env.rethinkdbpw}`
  },
  function (err, conn) {
    if (err) console.log('error in connection: ', err)
    console.log(`here is conn: ${conn}`)
    connection = conn
    app.set('reThinkDB', conn)
  }
)

setTimeout(() => {
  console.log('Connected to rethinkdb server: ', connection.host)
}, 3000)

getPosts = res => {
  r.table('Posts').run(connection, (err, cursor) => {
    if (err) console.log(err)
    cursor.toArray((err, data) => {
      res.status(200).send(data)
    })
  })
}

app.get('/api/getPosts', (req, res) => {
  getPosts(res)
})
app.get('/api/getUser', (req, res) => {
  console.log(req.query)
  r.table('Users')
    .filter(function (user) {
      return user('email').eq(req.query.email)
    })
    .run(connection, (err, cursor) => {
      if (err) console.log(err)
      cursor.toArray((err, data) => {
        if (data.length == 0) {
          res.status(200).send('Not Found')
        } else {
          res.status(200).send(data)
          console.log(data)
        }
      })
    })
})
app.get('/api/getPosts', (req, res) => {
  console.log(req.query)
  r.table('Posts')
    .filter(function (post) {
      return post('text').eq(req.query.text)
    })
    .run(connection, (err, cursor) => {
      if (err) console.log(err)
      cursor.toArray((err, data) => {
        if (data.length == 0) {
          res.status(200).send('Not Found')
        } else {
          res.status(200).send(data)
          console.log(data)
        }
      })
    })
})

app.post('/api/makeComment/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .update({ comments: req.body.commentsArr })
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})
app.post('/api/leaveLikes/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .update({ likes: req.body.likesArr })
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})

app.post('/api/leaveMehs/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .update({ mehs: req.body.mehsArr })
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})

app.post('/api/leaveDislikes/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .update({ dislikes: req.body.DislikesArr })
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})

app.put('/api/updatePost/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .update({ text: req.body.text })
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})
app.post('/api/addUser', (req, res) => {
  console.log(req.body)
  r.table('Users')
    .insert(req.body)
    .run(connection, (err, data) => {
      r.table('Users')
        .get(req.body.email)
        .run(connection, (err, userData) => {
          console.log(userData)
          res.status(200).send(userData)
        })
    })
})
app.post('/api/createPost', (req, res) => {
  console.log(req.body)
  r.table('Posts')
    .insert(req.body)
    .run(connection, (err, data) => {
      console.log(data.generated_keys)
      r.table('Posts')
        .get(data.generated_keys[0])
        .run(connection, (err, postData) => {
          console.log(postData)

          getPosts(res)
        })
    })
})

app.delete('/api/deletePost/:id', (req, res) => {
  console.log(req.params)
  r.table('Posts')
    .get(req.params.id)
    .delete()
    .run(connection, (err, data) => {
      console.log(data)
      getPosts(res)
    })
})

const port = 4001
app.listen(port, () => console.log(`Server listening on port ${port}`))
