import ImageKit from "imagekit";
import dotenv from "dotenv";
import { ENV } from "./env";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
  privateKey: ENV.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
