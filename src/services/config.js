// const devBaseURL = "https://www.fastmock.site/mock/94a0f2047d1702f65cd162e1a272f080/api/";
const devBaseURL = "http://127.0.0.1:9501/platform/v1/";
const proBaseURL = "http://127.0.0.1:9501/platform/v1/";


export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 10000;