import axios from 'axios'


const instance = axios.create({
baseURL: 'http://localhost:3000', // change if needed
headers: {
'Content-Type': 'application/json',
},
})


// attach token if present
instance.interceptors.request.use((config) => {
const token = localStorage.getItem('prephub_token')
if (token) {
config.headers.Authorization = `Bearer ${token}`
}
return config
})


export default instance