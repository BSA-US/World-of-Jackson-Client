# Import Buildings from XLSX File
## Usage
- Configure an upload spreadsheet with columns named:
-- Building Named
-- Address
-- Latitude
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