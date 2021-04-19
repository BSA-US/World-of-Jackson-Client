# Import Buildings from XLSX File
## Usage
- Configure an upload spreadsheet with columns named:
    - Building Name
    - Address
    - Latitude
    - Longitude
- Fill the values for each building
- Obtain your [personal access token](https://app.contentful.com/account/profile/cma_tokens) from Contentful
- Add a file to the root of the `world-of-jackson` repo called ".env"
- Add values to .env as such:
```shell
CONTENTFUL_SPACE_ID=<the World of Jackson Space ID (ex: 7zzvnrgo4q2e as of the creation of this doc)>
CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN=<the above-mentioned personal access token>
CONTENTFUL_ENVIRONMENT=<the desired environment (ex: dev or master)>
```
- In Terminal:
```shell
> cd <world-of-jackson repo location>
> yarn import-xlsx <path to import file (ex: ~/Desktop/importBuildings.xlsx)>
```
Any errors that occur during the import will be logged to your terminal.
Access [Contentful](https://app.contentful.com/) to view/publish the posted buildings.

## Dev Tips
If it is easier to obtain only the text address of each building for the import, you can upload the spreadsheet to Google Sheets, select the Tools menu and then Script editor. This should open a page called Apps Script.

In the Apps Script page, add the function `GEOCODE_GOOGLE` as in the following snippet:
```javascript
/**
 * Returns latitude and longitude values for given address using the Google Maps Geocoder.
 *
 * @param {string} address - The address you get the latitude and longitude for.
 * @customfunction
 * 
 * @source https://community.looker.com/dashboards-looks-7/get-latitude-longitude-for-any-location-through-google-sheets-and-plot-these-in-looker-5402
 */
function GEOCODE_GOOGLE(address) {
  if (address.map) {
    return address.map(GEOCODE_GOOGLE)
  } else {
    var r = Maps.newGeocoder().geocode(address)
    for (var i = 0; i < r.results.length; i++) {
      var res = r.results[i]
      return res.geometry.location.lat + ", " + res.geometry.location.lng
    }
  }
}
```

You can then add Latitude and Longitude columns, parsing the each value out of this function's response.
Example value for the Latitude cell, presuming the text address is in cell A2:

`=INDEX(SPLIT(GEOCODE_GOOGLE(A2), ", "),0, 1)`

or for Longitude:

`=INDEX(SPLIT(GEOCODE_GOOGLE(A2), ", "),0, 2)`