import { ILocationResponse } from "../models/location-models.js";
import {
  convertDecimalToIP,
  convertIPtoDecimal,
  readCSVFile,
} from "../helpers/funcs.js";
import { CSV_FILE_PATH } from "../helpers/constants.js";

export const location = async (ip: string): Promise<ILocationResponse> => {
  try {
    const ipDecimal = convertIPtoDecimal(ip);

    const fileData = await readCSVFile(CSV_FILE_PATH, [
      "fromIp",
      "toIp",
      "id",
      "country",
    ]);

    const countryIP = fileData.filter(
      (item) =>
        ipDecimal >= Number(item.fromIp) && ipDecimal <= Number(item.toIp)
    );

    return {
      success: true,
      data: {
        country: countryIP[0].country,
        from: convertDecimalToIP(countryIP[0].fromIp),
        to: convertDecimalToIP(countryIP[0].toIp),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error set location",
    };
  }
};
