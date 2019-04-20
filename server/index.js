const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios');



app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/addUser', (req, res) => {
    console.log(req.body)
})


const port = 4001;
app.listen(port, () => console.log(`Server listening on port ${port}`))