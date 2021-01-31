const XLSX = require("xlsx");
const getContentfulEnv = require("../getContentfulEnvironment");
import { IBuildingFields, CONTENTFUL_DEFAULT_LOCALE_CODE } from "../types/db/contentful";
import { tsMatch } from "./helpers";

export type tableConfig = {
  name: string;
  lat: string;
  long: string;
}

type ImportXlsx = {
  read(fileBlob: Buffer): ImportSpreadSheet;
};

type ImportSpreadSheet = {
  Sheets: {
    [key: string]: ImportWorkSheet;
  };
};

interface ImportWorkSheetIface {
  "!ref": string;
}

type ImportWorkSheet = ImportWorkSheetIface & {
  [key: string]: ImportCell;
};

type ImportCell = { w: string };

type colRowSheetName = { sheetName: string; col: string; row: string };

function validateTableConfig(config: tableConfig): tableConfig {
  if (
    config.name === undefined ||
    config.lat === undefined ||
    config.long === undefined
  ) {
    throw new Error("Invalid config. Must have properties: name, lat, long");
  }
  return config;
}

interface IBuildingFieldsForTransmission {
  fields: {
    name: { [key: string]: string };
    latitutde: { [key: string]: number };
    longitude: { [key: string]: number };
    address: {
      [key: string]: {
        lat: number;
        lon: number;
      }
    }
  }
}

export class XlsxFormatter {
  xlsx: ImportXlsx;
  config: tableConfig;
  spreadSheet: ImportSpreadSheet;
  sheets: string[];
  buildings: IBuildingFieldsForTransmission[];
  buildingsMap: { [key: string]: IBuildingFields };

  constructor(config: tableConfig) {
    this.xlsx = XLSX;
    this.config = validateTableConfig(config);
    // initialize properties to empty values
    this.spreadSheet = { Sheets: {} };
    this.sheets = [];
    this.buildings = [];
    this.buildingsMap = {};
  }

  initSpreadsheet(fileBlob: Buffer) {
    this.spreadSheet = this.xlsx.read(fileBlob);
    this.sheets = Object.keys(this.spreadSheet.Sheets);

    this.findContent(this.config.name, "name");
    this.findContent(this.config.lat, "lat");
    this.findContent(this.config.long, "long");
  }

  async uploadContent() {
    const env = await getContentfulEnv();
    for (const bldg of Object.values(this.buildingsMap)) {
      console.log("Object to post:");
      console.log(JSON.stringify(this.prepareBuildingForTransmission(bldg), undefined, 2));
      try {
        env.createEntry('building', this.prepareBuildingForTransmission(bldg));
      } catch (err) {
        console.log(err);
      }
    }
  }

  prepareBuildingForTransmission(bldg: IBuildingFields): IBuildingFieldsForTransmission {
    const localeCode: CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US"
    const lat = bldg.address.lat;
    const lon = bldg.address.lon;
    return {
      fields: {
        name: { [localeCode]: bldg.name },
        latitutde: { [localeCode]: lat},
        longitude: { [localeCode]: lon},
        address: {
          [localeCode]: { lat, lon }
        }
      }
    }
  }

  findContent(field: string, conf: "name" | "lat" | "long") {
    let nameColRowSheet: colRowSheetName = { col: "", row: "", sheetName: "" };
    let contentSheet: ImportWorkSheet;
    let startOfData = 0;
    let endOfData = 0;
    for (const sheet of this.sheets) {
      nameColRowSheet = this.findHeaderColRow(sheet, field);
      if (
        nameColRowSheet.col.length > 0 &&
        nameColRowSheet.row.length > 0 &&
        nameColRowSheet.sheetName.length > 0
      ) {
        contentSheet = this.spreadSheet.Sheets[sheet];
        startOfData = Number(nameColRowSheet.row) + 1;
        endOfData = Number(this.getRow(contentSheet["!ref"].split(":")[1]));
        for (let i = startOfData; i <= endOfData; i++) {
          let cellName: string = `${nameColRowSheet.col}${i}`
          let mapKey: string = `${nameColRowSheet.sheetName}_${i}`
          if (contentSheet[cellName]) {
            let bldg: IBuildingFields = this.buildingsMap[mapKey];
            if (!bldg) {
              bldg = {
                name: '',
                address: {
                  lat: 0,
                  lon: 0
                }
              };
            }
            let content: string = contentSheet[cellName].w;
            switch (conf) {
              case "name":
                bldg.name = content;
                break;
              case "lat":
                bldg.address.lat = Number(content);
                break;
              case "long":
                bldg.address.lon = Number(content);
                break;
              default:
                throw new Error(`Invalid config name: ${conf}`);
            }
            this.buildingsMap[mapKey] = bldg;
          }
        }
      }
    }
  }

  findHeaderColRow(sheet: string, header: string): colRowSheetName {
    let sheetName: string = "";
    let addressCol: string = "";
    let addressRow: string = "";
    const checkSheet = this.spreadSheet.Sheets[sheet];
    const cellNames: string[] = Object.keys(checkSheet);
    for (const cellName of cellNames) {
      if (
        cellName !== "!ref" &&
        checkSheet[cellName]?.w.toLowerCase() == header.toLowerCase() || null
      ) {
        sheetName = sheet;
        addressCol = this.getCol(cellName);
        addressRow = this.getRow(cellName);
        break;
      }
    }
    return {
      sheetName,
      col: addressCol,
      row: addressRow,
    };
  }

  getCol(cell: string): string {
    return tsMatch(cell, /[A-Z]/g);
  }

  getRow(cell: string): string {
    return tsMatch(cell, /[0-9]/g)
  }
}
