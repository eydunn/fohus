const cheerio = require('cheerio')
const fetch = require('node-fetch')
const {
	fetchHtmlOk,
	handleError,
	objectFactory,
	statusCodes
} = require('./utils')

async function skyn() {
	const url = 'https://www.skyn.fo/ognir-til-soelu'

	return fetch(url)
		.then(fetchHtmlOk)
		.then(html => {
			const results = []
			const $ = cheerio.load(html)

			$('.ogn').each((i, el) => {
				let obj = objectFactory()

				const status = $(el)
					.attr('class')
					.split(/\s+/)
					.filter(x => Object.keys(statusCodes).includes(x))

				obj.status = statusCodes[status[0]] || null

				obj.address = $(el)
					.find('.ogn_headline')
					.text()

				obj.area = $(el)
					.find('.ogn_adress')
					.text()

				obj.img =
					'https://skyn.fo' +
					$(el)
						.find('.ogn_thumb>a>img')
						.attr('src')

				obj.price = $(el)
					.find('.listprice')
					.text()
					.split('.')
					.join('')

				obj.url =
					'https://skyn.fo' +
					$(el)
						.find('.ogn_thumb>a')
						.attr('href')

				obj.provider = 'skyn'
				results.push(obj)
			})

			return results
		})
		.catch(handleError)
}
module.exports = skyn
