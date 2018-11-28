import {createApi} from "../utils";

// 登录接口
export const registerApi = data => createApi('/user/login', data);
export const authApi = data => createApi('/auth', data);
