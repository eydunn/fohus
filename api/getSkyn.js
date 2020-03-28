const cheerio = require('cheerio')
const fetch = require('node-fetch')
const {
  fetchHtmlOk,
  handleError,
  objectFactory,
  statusCodes,
  cleanEmptyStrings
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
          .trim()

        obj.url =
          'https://skyn.fo' +
          $(el)
            .find('.ogn_thumb>a')
            .attr('href')

        obj.externalID =
          'skyn' +
          $(el)
            .find('.ogn_thumb>a')
            .attr('href')
            .split('PROD')[1]

        obj.rooms = $(el)
          .find('.prop-bedrooms')
          .parent()
          .text()
          .trim()
          .replace('−', '')

        obj.m2House = $(el)
          .find('.prop-size')
          .parent()
          .text()
          .replace('−', '')
          .replace('m2', '')
          .trim()

        obj.m2Property = $(el)
          .find('.prop-ground-size')
          .parent()
          .text()
          .replace('−', '')
          .replace('m2', '')
          .trim()

        obj.bid = $(el)
          .find('.latestoffer')
          .text()
          .split('.')
          .join('')

        obj.provider = 'skyn'

        obj = cleanEmptyStrings(obj)
        results.push(obj)
      })

      return results
    })
    .catch(handleError)
}
module.exports = skyn
