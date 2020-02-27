const cheerio = require('cheerio')
const fetch = require('node-fetch')
const {
	fetchHtmlOk,
	handleError,
	objectFactory,
	statusCodes
} = require('./utils')

async function meklarin() {
	const url = 'https://www.meklarin.fo/'

	return fetch(url)
		.then(fetchHtmlOk)
		.then(html => {
			const results = []
			const $ = cheerio.load(html)

			$('.house-air').each((i, el) => {
				let obj = objectFactory()

				const status = $(el)
					.find('.ogn-badge')
					.text()

				obj.status = statusCodes[status] || null

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

				obj.provider = 'meklarin'

				results.push(obj)
			})

			return results
		})
		.catch(handleError)
}
module.exports = meklarin
