import axios from "axios";
import qs from "qs";
let base = ""
export const requestLogin = params => {
    return axios.post(`${base}/login`, params)
        .then(res => res.data)
        .catch(err => console.log(err));
};

export const requestLogout = params => {
    return axios.get(`${base}/logout`, params)
        .then(res => res.data)
        .catch(err => console.log(err));
};
export const requestRegister = params => {
    return axios.post(`${base}/register`, params)
        .then(res => res.data)
        .catch(err => console.log(err));
};
export const test = params => {
    return axios.post('/person', params)
        .then(res => res.data)
        .catch(err => console.log(err));
};
export const getUserListPage = url => {
    return axios.get(url)
        .then(res => res.data)
        .catch(err => console.log(err))
};

export const removeUser = params => {
    return axios.delete(`${base}/users/` + params.id)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const editUser = params => {
    return axios.put(`${base}/users/` + params.id, qs.stringify(params.data))
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const addUser = params => {
    return axios.post(`${base}/users`, params, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(rea => rea.data)
        .catch(err => console.log(err))
};
export const batchRemoveUser = params => {
    return axios.delete(`${base}/users`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const removeOrder = params => {
    return axios.delete(`${base}/orders/` + params.id)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const addItem = params => {
    return axios.post(`${base}/addItem`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const removeItem = params => {
    return axios.post(`${base}/removeitems`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const editItem = params => {
    return axios.put(`${base}/items`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const addOrder = params => {
    return axios.post(`${base}/orders`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const editOrder = params => {
    return axios.put(`${base}/orders`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const removeFromCart = params => {
    return axios.put(`${base}/removeitemsFromcart`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};
export const checkout = params => {
    return axios.post(`${base}/checkout`, params)
        .then(res => res.data)
        .catch(err => console.log(err))
};

export const getPublicKeyFromServer = () => {
    return axios.get()
        .then(res => res.data)
        .catch(err => console.log(err))
};