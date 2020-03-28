const cheerio = require('cheerio')
const fetch = require('node-fetch')
const {
  fetchHtmlOk,
  handleError,
  objectFactory,
  statusCodes,
  cleanEmptyStrings
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

        obj.builtYear = $(el)
          .find('.box-built>span')
          .text()

        obj.m2House = $(el)
          .find('.box-house-area>span')
          .text()
          .replace('m2', '')

        obj.m2Property = $(el)
          .find('.box-area-size>span')
          .text()
          .replace('m2', '')
          .split('.')
          .join('')

        obj.rooms = $(el)
          .find('.box-bedrooms>span')
          .text()

        obj.bid = $(el)
          .find('.ogn-bid>.price-value')
          .text()
          .replace('kr. ', '')
          .split('.')
          .join('')

        obj.externalID =
          'meklarin' +
          $(el)
            .attr('class')
            .split('-id-')[1]
            .split(' ')[0]

        obj.type = $(el)
          .attr('class')
          .split('type-')[2]
          .split(' ')[0]

        obj = cleanEmptyStrings(obj)

        results.push(obj)
      })

      return results
    })
    .catch(handleError)
}
module.exports = meklarin
