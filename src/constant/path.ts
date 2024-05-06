export const ASSET_PATH = "assets";
export const IMG_ASSET_PATH = [ASSET_PATH, "img"].join("/");
export const BG_ASSET_PATH = [IMG_ASSET_PATH, "bg"].join("/");
export const BODY_PART_ASSET_PATH = [IMG_ASSET_PATH, "player"].join("/");
export const BODY_ASSET_PATH = [BODY_PART_ASSET_PATH, "body"].join("/");
export const FOOT_ASSET_PATH = [BODY_PART_ASSET_PATH, "foot"].join("/");
export const HEAD_ASSET_PATH = [BODY_PART_ASSET_PATH, "head"].join("/");
export const FACE_ASSET_PATH = [BODY_PART_ASSET_PATH, "face"].join("/");

export const getAssetPath = (path: string, fileName: string) => {
  return [path, fileName].join("/");
};

export const getBgPath = (fileName: string) =>
  getAssetPath(BG_ASSET_PATH, fileName);

export const getBodyPath = (fileName: string) =>
  getAssetPath(BODY_ASSET_PATH, fileName + ".png");

export const getFootPath = (fileName: string) =>
  getAssetPath(FOOT_ASSET_PATH, fileName);

export const getHeadPath = (fileName: string) =>
  getAssetPath(HEAD_ASSET_PATH, fileName + ".png");
export const getFacePath = (fileName: string) =>
  getAssetPath(FACE_ASSET_PATH, fileName + ".png");
