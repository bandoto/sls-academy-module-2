import fs from "fs";
import csv from "csv-parser";
import { ICountryInfo } from "../models/location-models.js";

export const convertIPtoDecimal = (ip: string): number => {
  const parts: number[] = ip.split(".").map(Number);

  return parts[0] * 256 ** 3 + parts[1] * 256 ** 2 + parts[2] * 256 + parts[3];
};

export const convertDecimalToIP = (decimal: string | number): string => {
  const decimalToNumber =
    typeof decimal === "number" ? decimal : Number(decimal);

  if (decimalToNumber < 0 || decimalToNumber > 4294967295) {
    return "Invalid decimal value";
  }

  const octet1 = (decimalToNumber >>> 24) & 255;
  const octet2 = (decimalToNumber >>> 16) & 255;
  const octet3 = (decimalToNumber >>> 8) & 255;
  const octet4 = decimalToNumber & 255;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

export const readCSVFile = async (
  path: string,
  csvArr: string[]
): Promise<ICountryInfo[]> => {
  const results: ICountryInfo[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv(csvArr))
      .on("data", (data) => results.push(data))
      .on("end", resolve)
      .on("error", reject);
  });

  return results;
};
