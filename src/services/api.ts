import axios from './axios.customize';

export const loginAPI = (username: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password })
}
export const getUsersAPI = () => {
    const urlBackend = "/api/v1/user?current=1&pageSize=5";
    axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend)
}