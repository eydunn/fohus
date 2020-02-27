const getSkyn = require('./getSkyn_test.js')
const getBetri = require('./getBetri_test.js')
const getMeklarin = require('./getMeklarin_test.js')

async function api() {
	const resultsSkyn = await getSkyn()
	const resultsBetri = await getBetri()
	const resultsMeklarin = await getMeklarin()

	const results = [...resultsSkyn, ...resultsBetri, ...resultsMeklarin]
	console.log(results)
	return results
}
api()
