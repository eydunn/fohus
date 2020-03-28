function fetchHtmlOk(res) {
  if (res.ok) return res.text()
  throw Error('Request to source failed')
}
function fetchJsonOk(res) {
  if (res.ok) return res.json()
  throw Error('Request to source failed')
}

function handleError(err) {
  console.log('Error: ', err.message)
  return []
}
function cleanEmptyStrings(obj) {
  Object.keys(obj).forEach(x => (obj[x] = obj[x] === '' ? null : obj[x]))
  return obj
}

function objectFactory() {
  return {
    status: null,
    address: null,
    area: null,
    img: null,
    price: null,
    url: null,
    provider: null,
    externalID: null,
    rooms: null,
    m2House: null,
    m2Property: null,
    bid: null,
    type: null,
    coordinates: null
  }
}
const statusCodes = {
  newbid: 'bid',
  sold: 'sold',
  newprop: 'new',
  Selt: 'sold',
  Nýtt: 'new',
  'Nýtt boð': 'bid',
  NewOgn: 'new',
  NewBid: 'bid',
  Sold: 'sold',
  OpenHouse: 'openhouse'
}

module.exports = {
  fetchHtmlOk,
  handleError,
  objectFactory,
  statusCodes,
  fetchJsonOk,
  cleanEmptyStrings
}
