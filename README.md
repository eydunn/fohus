<img src="https://raw.githubusercontent.com/digvalley/fohus/master/fohus.png" alt="logo" width="100px" style="margin:0 auto;display:block"/>


Webscraper and data collector of realestate data in the Faroe Islands
https://fohus.now.sh/

> GET /api

Returns an array of objects from

* [x] Betriheim.fo
* [x] Skyn.fo
* [x] Meklarin.fo

#### Properties:

* status

  * new
  * bid
  * openhouse
  * sold
  * none

* **address** (string)
* **area** (string)
* **img** (string / url)
* **price** (string)
* **url** (string/url)
* **provider** (string)

#### TODO

* [ ] ADD: Search features in API
* [ ] ADD: More data to objects
* [ ] DO: Optimization and code cleanup
* [ ] DO: Replace legacy request-promise with node-fetch
* [ ] ADD: Examples
