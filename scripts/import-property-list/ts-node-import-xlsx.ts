#!/usr/bin/env ts-node-script
import fs = require("fs");
import { XlsxFormatter, tableConfig } from "../../utils/import-xlsx"

const filePath: string = process.argv[2];
const pathToConfig: string = process.argv[3];

let config: tableConfig;

const defaultConfig: tableConfig = {
    name: "Building Name",
    lat: "Latitude",
    long: "Longitude"
}

try {
    config = require(pathToConfig);
} catch (err) {
    console.warn(`Error getting table config from ${pathToConfig}: `, err);
}
if (!config) {
    config = defaultConfig;
}
console.log(`Using this config for table header names: `, JSON.stringify(config, undefined, 2));

if (!filePath) {
    const usageMsg: string = `
    Usage: yarn import-xlsx <file path to excel file>
    `
    console.log(usageMsg)
} else {
    importXlsxPropertyList(filePath)
}

function importXlsxPropertyList(filePath: string) {
    let fileBlob: Buffer
    // first block, obtain input file
    try {
        // check for read access to file
        fs.accessSync(filePath, fs.constants.R_OK)
        fileBlob = fs.readFileSync(filePath)
        console.log(`successfully read ${fileBlob.length} bits from file`)
    } catch (err) {
        console.warn(err)
    }

    // second block, parse file data
    const xlsxFormatter = new XlsxFormatter(config);
    try {
        xlsxFormatter.initSpreadsheet(fileBlob)
    } catch (err) {
        console.warn(err)
    }
    // third block, post to contentful
    try {
        xlsxFormatter.uploadContent();
    } catch (err) {
        console.log(err);
    }
}
