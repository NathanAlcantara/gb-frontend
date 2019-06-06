import { environment } from "~environments/environment";

export const PROD = environment.production ? environment.production : false;
export const BASE_URL = environment.baseURL;

export const AWS_BUCKET_DEV = "devs-files";
export const AWS_BUCKET_PHOTOS = PROD ? "products-photo" : AWS_BUCKET_DEV;
