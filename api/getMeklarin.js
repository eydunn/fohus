const cheerio = require('cheerio')
var request = require('request-promise')

async function meklarin() {
	const results = []
	const url = 'https://www.meklarin.fo/'

	return request
		.get(url, function(err, resp, html) {
			if (!err) {
				const $ = cheerio.load(html)

				$('.house-air').each((i, el) => {
					let obj = {}
					obj.status = $(el)
						.find('.ogn-badge')
						.text()
					if (obj.status === 'Selt') obj.status = 'sold'
					if (obj.status === 'Nýtt') obj.status = 'new'
					if (obj.status === 'Nýtt boð') obj.status = 'bid'
					if (obj.status === '') obj.status = 'none'

					obj.address = $(el)
						.find('.house-air-text>h2')
						.text()

					obj.area = $(el)
						.find('.house-city')
						.text()

					obj.img = $(el)
						.find('.focal-crop')
						.attr('data-src')

					obj.price = $(el)
						.find('.ogn-sell-price>.price-value')
						.text()
						.replace('kr. ', '')
						.split('.')
						.join('')

					obj.url = $(el)
						.find('.house-air-content')
						.attr('href')

					obj.provider = 'Meklarin'

					results.push(obj)
				})
			}
		})
		.then(_ => results)
}
module.exports = meklarin
