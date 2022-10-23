import { promises as fs } from "fs";

export const getDirectoryFileNames = async (directoryPath: string) => {
  let fileNames: string[] = [];
  try {
    fileNames = await fs.readdir(directoryPath);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  const fileNamesFiltered = fileNames.filter((fileName: string) => {
    return fileName.endsWith(".ts");
  });
  return fileNamesFiltered;
};

export const importFileContent = async (filePath: string) => {
  let exportedMembers: any;
  try {
    exportedMembers = await import(filePath);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return exportedMembers;
};
