const cheerio = require('cheerio')
const getSkyn = require('./getSkyn.js')
const getBetri = require('./getBetri.js')

async function api() {
	const resultsSkyn = await getSkyn()
	const resultsBetri = await getBetri()

	const results = [...resultsSkyn, ...resultsBetri]
	console.log(results)
	return results
}

api()
