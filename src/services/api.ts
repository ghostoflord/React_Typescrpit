import axios from './axios.customize';

// start auth
export const loginAPI = (username: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password }, {
        headers: {
            delay: 3000
        }
    })
}

export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend = "/api/v1/user/register";
    return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone })
}
// end auth

// start call api user
export const getUsersAPI = () => {
    const urlBackend = "/api/v1/user?current=1&pageSize=5";
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend)
}

export const deleteUserAPI = (_id: string) => {
    const urlBackend = `/api/v1/user/${_id}`;
    return axios.delete<IBackendRes<IRegister>>(urlBackend)
}

export const createUserAPI = (fullName: string, password: string, email: string, phone: string) => {
    const urlBackend = "/api/v1/user";
    return axios.post<IBackendRes<IRegister>>(urlBackend,
        { fullName, email, password, phone })
}
// end call api user

// start call api book
export const getBooksAPI = () => {
    const urlBackend = "/api/v1/book?current=1&pageSize=5";
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend)
}


export const createBookAPI = (thumbnail:string,slider:string,mainText:string,author:string,price:string,quantity:string,category:string) => {
    const urlBackend = "/api/v1/book"
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend,{thumbnail,slider,mainText,author,price,quantity,category})
}