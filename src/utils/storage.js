import { get, set, del } from "idb-keyval";
import { Capacitor } from "@capacitor/core";

const getFilesystem = async () => {
  if (Capacitor.getPlatform() === "web") return null;
  try {
    return await import("@capacitor/filesystem");
  } catch (e) {
    console.warn(
      "Capacitor Filesystem not found, defaulting to Browser Storage",
    );
    return null;
  }
};

export const saveFile = async (data) => {
  await set("disney_trip_data", data);
  const FS = await getFilesystem();
  if (FS) {
    const { Filesystem, Directory, Encoding } = FS;
    await Filesystem.writeFile({
      path: "itinerary_package.json",
      data: JSON.stringify(data),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }
};

export const loadFromDevice = async () => {
  const localData = await get("disney_trip_data");
  if (localData) return localData;

  const FS = await getFilesystem();
  if (FS) {
    try {
      const { Filesystem, Directory, Encoding } = FS;
      const file = await Filesystem.readFile({
        path: "itinerary_package.json",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return JSON.parse(file.data);
    } catch (e) {
      return null;
    }
  }
  return null;
};
