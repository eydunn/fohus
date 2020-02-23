const cheerio = require('cheerio')
const request = require('request-promise')

async function betri() {
	const status = {
		NewOgn: 'new',
		NewBid: 'bid',
		Sold: 'sold',
		OpenHouse: 'openhouse'
	}
	const url = 'https://www.betriheim.fo/api/ognsearch/filter'
	const options = {
		url: url,
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		json: true,
		body: {
			price_min: 0,
			price_max: 5000000,
			area: '',
			type: '',
			page: 1
		}
	}

	return request
		.post(options)
		.then(res => {
			return res.items.map(x => ({
				address: x.street,
				area: x.postcodeAndCity,
				url: 'https://www.betriheim.fo' + x.url,
				img: x.imageUrl,
				price: x.suggestedPrice,
				status: status[x.statusLabelClass] || 'none',
				provider: 'Betriheim'
			}))
		})
		.then(formatted => formatted)
		.catch(er => [])
}

module.exports = betri
