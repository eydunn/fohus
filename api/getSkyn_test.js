const cheerio = require('cheerio')
var fetch = require('node-fetch')

async function skyn() {
	const url = 'https://www.skyn.fo/ognir-til-soelu'

	return fetch(url)
		.then(res => {
			if (!res.ok) throw Error(res.statusText)

			const results = []
			const $ = cheerio.load(res.text())

			$('.ogn').each((i, el) => {
				let obj = {
					status: NULL,
					address: NULL,
					area: NULL,
					img: NULL,
					price: NULL,
					url: NULL,
					provider: NULL
				}
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
			return results
		})
		.then(result => result)
}
module.exports = skyn
