import Bucket from "../models/bucket-model.js";
import Storage from "../models/storage-model.js";
import { IExistBucket, IResponse } from "../interfaces/storage-interface.js";

export const putFile = async (
  bucket: string,
  json: string,
  data: any
): Promise<IResponse> => {
  const existBucket = await Bucket.findOne({ bucketName: bucket });
  const existName = await Storage.findOne({ jsonName: json });

  if (existBucket && existName) {
    return {
      success: false,
      error: "Path already exist",
    };
  }

  const newJsonFile = new Storage({
    jsonName: json,
    jsonData: data,
  });
  await newJsonFile.save();

  if (existBucket) {
    await Bucket.findOneAndUpdate(
      { bucketName: bucket },
      {
        $push: { jsonFiles: newJsonFile },
      }
    );
  } else {
    const newBucket = new Bucket({
      bucketName: bucket,
      jsonFiles: [newJsonFile],
    });
    await newBucket.save();
  }

  return {
    success: true,
    data: newJsonFile,
  };
};

export const getFile = async (
  bucket: string,
  json: string
): Promise<IResponse> => {
  const existBucket = (await Bucket.findOne({ bucketName: bucket }).populate(
    "jsonFiles"
  )) as IExistBucket;

  if (!existBucket) {
    return {
      success: false,
      error: "Bucket not found",
    };
  }
  const bucketFiles = existBucket.jsonFiles;

  if (!bucketFiles.length) {
    return {
      success: false,
      error: "This bucket empty",
    };
  }

  const currentFile = bucketFiles.find((file) => file.jsonName === json);

  if (!currentFile) {
    return {
      success: false,
      error: "File not found in bucket",
    };
  }

  return {
    success: true,
    data: currentFile.jsonData,
  };
};
