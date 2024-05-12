export const ASSET_PATH = "assets";
export const IMG_ASSET_PATH = [ASSET_PATH, "img"].join("/");
export const BG_ASSET_PATH = [IMG_ASSET_PATH, "bg"].join("/");
export const BODY_PART_ASSET_PATH = [IMG_ASSET_PATH, "player"].join("/");
export const BODY_ASSET_PATH = [BODY_PART_ASSET_PATH, "body"].join("/");
export const LEFT_FOOT_ASSET_PATH = [BODY_PART_ASSET_PATH, "leftFoot"].join(
  "/"
);
export const RIGHT_FOOT_ASSET_PATH = [BODY_PART_ASSET_PATH, "rightFoot"].join(
  "/"
);
export const HEAD_ASSET_PATH = [BODY_PART_ASSET_PATH, "head"].join("/");
export const FACE_ASSET_PATH = [BODY_PART_ASSET_PATH, "face"].join("/");

export const getAssetPath = (...path: string[]) => {
  return path.join("/");
};

export const getBgPath = (fileName: string) =>
  getAssetPath(BG_ASSET_PATH, fileName);

export const getBodyPath = (playerName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, playerName, "Body.png");

export const getLeftFootPath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "Left Leg.png");

export const getRightFootPath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "Right Leg.png");

export const getHeadPath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "Head.png");

export const getFacePath = (fileName: string, faceNum = 1) =>
  getAssetPath(
    BODY_PART_ASSET_PATH,
    fileName,
    `Face ${faceNum.toString().padStart(2, "0")}.png`
  );

export const getWeaponsPath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "Weapon.png");

export const getSlicePath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "SlashFX.png");

export const getShieldPath = (fileName: string) =>
  getAssetPath(BODY_PART_ASSET_PATH, fileName, "Shield.png");
