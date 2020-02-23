const cheerio = require('cheerio')
var request = require('request-promise')

async function skyn() {
	const results = []
	const url = 'https://www.skyn.fo/ognir-til-soelu'

	return request
		.get(url, function(err, resp, html) {
			if (!err) {
				const $ = cheerio.load(html)

				$('.ogn').each((i, el) => {
					let obj = {}
					obj.status = 'none'
					if ($(el).hasClass('sold')) obj.status = 'sold'
					if ($(el).hasClass('newprop')) obj.status = 'new'
					if ($(el).hasClass('newbid')) obj.status = 'bid'

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

					obj.provider = 'Skyn'

					results.push(obj)
				})
			}
		})
		.then(_ => results)
}
module.exports = skyn
