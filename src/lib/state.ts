import { atom } from "recoil";

const userId = atom({
  key: "userId",
  default: "",
});

const spotifyUris = atom({
  key: "uris",
  default: [] as string[],
});

export { userId, spotifyUris };
