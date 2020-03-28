const fetch = require('node-fetch')
const {
  fetchJsonOk,
  handleError,
  objectFactory,
  statusCodes
} = require('./utils')

async function betri() {
  const url = 'https://www.betriheim.fo/api/ognsearch/filter'

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      price_min: 0,
      price_max: 5000000,
      area: '',
      type: '',
      page: 1
    })
  }

  return fetch(url, options)
    .then(fetchJsonOk)
    .then(json => {
      return json.items.map(x => ({
        ...objectFactory(),
        address: x.street,
        area: x.postcodeAndCity,
        url: 'https://www.betriheim.fo' + x.url,
        img: x.imageUrl,
        price: x.suggestedPrice,
        status: (x.statusLabel && statusCodes[x.statusLabelClass]) || null,
        externalID: 'betriheim' + x.id,
        provider: 'betriheim',
        coordinates: x.googleMapsCoordinates || null,
        rooms: x.buildingBedrooms || null,
        builtYear: x.buildingYearBuilt || null,
        m2House: x.buildingSize || null,
        m2Property: x.plotSize || null,
        type: x.ognType,
        bid: x.latestBid || null
      }))
    })
    .catch(handleError)
}

module.exports = betri
