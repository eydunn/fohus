<img src="https://raw.githubusercontent.com/digvalley/fohus/master/fohus.png" alt="logo" width="100px" style="margin:0 auto;display:block"/>

Webscraper and data collector of realestate data in the Faroe Islands
https://fohus.now.sh/

> GET /api

Returns an array of objects from

- [x] Betriheim.fo
- [x] Skyn.fo
- [x] Meklarin.fo

#### Properties:

Empty property values will be returned as `NULL`

```javascript
{
    status: (String) 'new'/'bid'/'openhouse'/'sold',
    address: (String),
    area:  (String),
    img: (String/url),
    price: (String/int),
    url: (String/url),
    provider: (String),
    externalID: (String),
    rooms: (String/int),
    m2House: (String/int),
    m2Property: (String/int),
    bid: (String/int),
    type: (String/ experimental),
    coordinates: (String/experimental)
  }
```

#### TODO

- [ ] ADD: Search features in API
- [x] ADD: More data to objects
- [ ] DO: Optimization and code cleanup
- [x] DO: Replace legacy request-promise with node-fetch
- [ ] ADD: Examples
