import path from "path";

export const createPath = (paths: string[]) => {
  return path.join(...paths);
};
