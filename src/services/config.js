// const devBaseURL = "https://www.fastmock.site/mock/94a0f2047d1702f65cd162e1a272f080/api/";
const devBaseURL = "http://47.108.88.248:9601/api/v1/team";
const proBaseURL = "https://apiv1-forest.fosuss.com/api/v1/team";


export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 10000;