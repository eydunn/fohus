const cheerio = require('cheerio')
const getSkyn = require('./getSkyn.js')
const getBetri = require('./getBetri.js')
const getMeklarin = require('./getMeklarin.js')

async function api() {
	const resultsSkyn = await getSkyn()
	const resultsBetri = await getBetri()
	const resultsMeklarin = await getMeklarin()

	const results = [...resultsSkyn, ...resultsBetri, ...resultsMeklarin]

	return results
}

module.exports = api
