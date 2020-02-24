const express = require('express')
const app = express()
const port = 3000

const api = require('./api')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/'))

app.get('/api', async (req, res) => res.json(await api()))
app.get('/', async (req, res) => {
	let listings = await api()
	res.render('home', {
		listings: listings
			.filter(x => x.status !== 'sold')
			.sort((a, b) => (a.status !== 'new' ? 1 : -1))
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
