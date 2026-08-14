import axios from "axios"

const api = axios.create({
    baseURL: "",
    withCredentials: true,
    timeout: 15000
})

export default api