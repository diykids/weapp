import {createApi,createUpload} from "../utils";

// 登录接口
export const registerApi = data => createApi('/user/login', data);
export const authApi = data => createApi('/auth', data);
export const uploadApi = (file,data) => createUpload(file, data);
export const momentPostApi = data => createApi("/user/moment/post", data);
export const likeApi = data => createApi("/user/moment/like", data);

// 无需登录接口
export const mommentListApi = data => createApi("/moment/list", data);
export const momentDetailApi = data => createApi("/moment/detail", data);
