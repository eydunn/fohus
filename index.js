const express = require('express')
const app = express()
const port = 3000

const api = require('./api')

app.get('/', async (req, res) => res.json(await api()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
